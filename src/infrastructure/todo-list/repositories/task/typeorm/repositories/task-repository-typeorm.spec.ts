import { TaskRepositoryTypeORM } from './task-repository-typeorm'
import { mockTaskModel } from '@/domain/todo-list'
import { TypeOrmRepositorySpy } from '@/infrastructure/common/mocks'

jest.mock('typeorm', () => ({
  Entity: () => {},
  PrimaryGeneratedColumn: () => {},
  ManyToMany: () => {},
  JoinTable: () => {},
  OneToMany: () => {},
  ManyToOne: () => {},
  OneToOne: () => {},
  JoinColumn: () => {},
  Column: () => {},
  CreateDateColumn: () => {},
  UpdateDateColumn: () => {},
  AfterLoad: () => {},
  In: () => {},
  getRepository: () => { return new TypeOrmRepositorySpy() }
}))

type sutTypes = {
  sut: TaskRepositoryTypeORM
}

const makeSut = (): sutTypes => ({
  sut: new TaskRepositoryTypeORM()
})

describe('TaskRepositoryTypeORM', () => {
  describe('Create Method', () => {
    test('Should call Create with correct values', async () => {
      const { sut } = makeSut()
      const createSpy = jest.spyOn(sut.repositoryTypeORM, 'create')
      const request = mockTaskModel()
      await sut.create(request)
      expect(createSpy).toHaveBeenCalledWith(request)
    })

    test('Should call save with correct values', async () => {
      const { sut } = makeSut()
      const Task = mockTaskModel()
      jest.spyOn(sut.repositoryTypeORM, 'create').mockReturnValue(Task)
      const saveSpy = jest.spyOn(sut.repositoryTypeORM, 'save')
      await sut.create(mockTaskModel())
      expect(saveSpy).toHaveBeenCalledWith(Task)
    })

    test('Should return a new Task if succeeds', async () => {
      const { sut } = makeSut()
      const Task = mockTaskModel()
      jest.spyOn(sut.repositoryTypeORM, 'create').mockReturnValue(Task)
      const createdTask = await sut.create(mockTaskModel())
      expect(createdTask).toEqual(Task)
    })
  })
})
