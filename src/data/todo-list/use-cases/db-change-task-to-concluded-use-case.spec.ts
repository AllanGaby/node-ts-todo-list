import { DbChangeTaskToConcludedUseCase } from './db-change-task-to-concluded-use-case'
import { GetEntityByIdRepositorySpy, UpdateEntityRepositorySpy } from '@/data/common/mocks'
import { mockTaskModel, TaskModel, TaskState } from '@/domain/todo-list'
import { EntityIsNotFoundError } from '@/data/common/errors'
import faker from 'faker'

type sutTypes = {
  sut: DbChangeTaskToConcludedUseCase
  getTaskByIdRepository: GetEntityByIdRepositorySpy<TaskModel>
  updateTaskRepository: UpdateEntityRepositorySpy<TaskModel>
}

const makeSut = (): sutTypes => {
  const getTaskByIdRepository = new GetEntityByIdRepositorySpy<TaskModel>()
  getTaskByIdRepository.entity = mockTaskModel()
  const updateTaskRepository = new UpdateEntityRepositorySpy<TaskModel>()
  updateTaskRepository.entity = mockTaskModel()
  const sut = new DbChangeTaskToConcludedUseCase(getTaskByIdRepository, updateTaskRepository)
  return {
    sut,
    getTaskByIdRepository,
    updateTaskRepository
  }
}

describe('DbChangeTaskToConcludedUseCase', () => {
  test('Should call GetTaskByIdRepository with correct value', async () => {
    const { sut, getTaskByIdRepository } = makeSut()
    const taskId = faker.random.uuid()
    await sut.concluded(taskId)
    expect(getTaskByIdRepository.entityId).toBe(taskId)
  })

  test('Should return EntityIsNotFoundError if GetTaskByIdRepository returns undefined', async () => {
    const { sut, getTaskByIdRepository } = makeSut()
    delete getTaskByIdRepository.entity
    const promise = sut.concluded(faker.random.uuid())
    await expect(promise).rejects.toThrowError(EntityIsNotFoundError)
  })

  test('Should not call UpdateTaskByIdRepository if GetTaskByIdRepository returns undefined', async () => {
    const { sut, getTaskByIdRepository, updateTaskRepository } = makeSut()
    const updateSpy = jest.spyOn(updateTaskRepository, 'update')
    delete getTaskByIdRepository.entity
    const promise = sut.concluded(faker.random.uuid())
    await expect(promise).rejects.toThrowError(EntityIsNotFoundError)
    expect(updateSpy).not.toHaveBeenCalled()
  })

  test('Should call UpdateTaskByIdRepository with correct values', async () => {
    const { sut, getTaskByIdRepository, updateTaskRepository } = makeSut()
    await sut.concluded(faker.random.uuid())
    expect(updateTaskRepository.params).toEqual({
      ...getTaskByIdRepository.entity,
      state: TaskState.concluded
    })
  })

  test('Should return same UpdateTaskByIdRepository returns', async () => {
    const { sut, updateTaskRepository } = makeSut()
    const updatedTask = await sut.concluded(faker.random.uuid())
    expect(updatedTask).toEqual(updateTaskRepository.entity)
  })
})
