import { DbChangeTaskToPendingUseCase } from './db-change-task-to-pending-use-case'
import { GetEntityByIdRepositorySpy, UpdateEntityRepositorySpy } from '@/data/common/mocks'
import { mockChangeTaskToPendingDTO, mockTaskModel, TaskModel, TaskState } from '@/domain/todo-list'
import { EntityIsNotFoundError, InvalidCredentialsError, AccessDeniedError } from '@/data/common/errors'
import faker from 'faker'

type sutTypes = {
  sut: DbChangeTaskToPendingUseCase
  getTaskByIdRepository: GetEntityByIdRepositorySpy<TaskModel>
  updateTaskRepository: UpdateEntityRepositorySpy<TaskModel>
}

const makeSut = (): sutTypes => {
  const getTaskByIdRepository = new GetEntityByIdRepositorySpy<TaskModel>()
  getTaskByIdRepository.entity = mockTaskModel()
  const updateTaskRepository = new UpdateEntityRepositorySpy<TaskModel>()
  updateTaskRepository.entity = mockTaskModel()
  const sut = new DbChangeTaskToPendingUseCase(getTaskByIdRepository, updateTaskRepository)
  return {
    sut,
    getTaskByIdRepository,
    updateTaskRepository
  }
}

describe('DbChangeTaskToPendingUseCase', () => {
  test('Should return InvalidCredentialsError if password is wrong', async () => {
    const { sut } = makeSut()
    const request = mockChangeTaskToPendingDTO()
    request.password = faker.internet.password()
    const promise = sut.pending(request)
    await expect(promise).rejects.toThrowError(InvalidCredentialsError)
  })

  test('Should call GetTaskByIdRepository with correct value', async () => {
    const { sut, getTaskByIdRepository } = makeSut()
    const request = mockChangeTaskToPendingDTO()
    await sut.pending(request)
    expect(getTaskByIdRepository.entityId).toBe(request.id)
  })

  test('Should return EntityIsNotFoundError if GetTaskByIdRepository returns undefined', async () => {
    const { sut, getTaskByIdRepository } = makeSut()
    delete getTaskByIdRepository.entity
    const promise = sut.pending(mockChangeTaskToPendingDTO())
    await expect(promise).rejects.toThrowError(EntityIsNotFoundError)
  })

  test('Should return AccessDeniedError if you reached the limit of changes ', async () => {
    const { sut, getTaskByIdRepository } = makeSut()
    getTaskByIdRepository.entity.change_to_pending = faker.random.number({ min: 3, max: 10 })
    const promise = sut.pending(mockChangeTaskToPendingDTO())
    await expect(promise).rejects.toThrowError(AccessDeniedError)
  })

  test('Should not call UpdateTaskByIdRepository if GetTaskByIdRepository returns undefined', async () => {
    const { sut, getTaskByIdRepository, updateTaskRepository } = makeSut()
    const updateSpy = jest.spyOn(updateTaskRepository, 'update')
    delete getTaskByIdRepository.entity
    const promise = sut.pending(mockChangeTaskToPendingDTO())
    await expect(promise).rejects.toThrowError(EntityIsNotFoundError)
    expect(updateSpy).not.toHaveBeenCalled()
  })

  test('Should call UpdateTaskByIdRepository with correct values', async () => {
    const { sut, getTaskByIdRepository, updateTaskRepository } = makeSut()
    await sut.pending(mockChangeTaskToPendingDTO())
    expect(updateTaskRepository.params).toEqual({
      ...getTaskByIdRepository.entity,
      state: TaskState.pending
    })
  })

  test('Should return same UpdateTaskByIdRepository returns', async () => {
    const { sut, updateTaskRepository } = makeSut()
    const updatedTask = await sut.pending(mockChangeTaskToPendingDTO())
    expect(updatedTask).toEqual(updateTaskRepository.entity)
  })
})
