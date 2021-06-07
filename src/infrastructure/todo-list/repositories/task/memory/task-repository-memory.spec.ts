import { TaskRepositoryMemory } from './task-repository-memory'
import { mockTaskModel } from '@/domain/todo-list'

type sutTypes = {
  sut: TaskRepositoryMemory
}

const makeSut = (): sutTypes => ({
  sut: TaskRepositoryMemory.getRepository()
})

describe('TaskRepositoryMemory', () => {
  beforeEach(() => {
    TaskRepositoryMemory.getRepository().entities = []
  })

  describe('Create Method', () => {
    test('Should return new Task with correct values', async () => {
      const { sut } = makeSut()
      const Task = mockTaskModel()
      const createdTask = await sut.create(Task)
      expect(createdTask.id).toBeTruthy()
      expect(createdTask.created_at).toBeTruthy()
      expect(createdTask.updated_at).toBeTruthy()
      expect(createdTask.title).toBe(Task.title)
      expect(createdTask.description).toBe(Task.description)
      expect(createdTask.email).toBe(Task.email)
      expect(createdTask.state).toBe(Task.state)
      expect(createdTask.change_to_pending).toBe(Task.change_to_pending)
    })
  })
})
