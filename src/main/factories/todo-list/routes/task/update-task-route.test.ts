import app from '@/main/config/express/app'
import { HttpStatusCode } from '@/presentation/common/protocols'
import { TaskRepositoryMemory } from '@/infrastructure/todo-list/repositories/task/memory'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'
import { mockTaskModel, TaskModel } from '@/domain/todo-list'

const url = '/api/todo/task/'
let server: http.Server
let agent: SuperAgentTest
let task: TaskModel

const getUrlWithId = (taskId: string): string => {
  if (taskId) {
    return `${url}${taskId}`
  }
  return url
}

describe('PUT /task/:id - Update a Task', () => {
  beforeEach((done) => {
    server = app.listen(4000, (): void => {
      agent = supertest.agent(server)
      done()
    })
  })

  afterEach((done) => {
    return server && server.close(done)
  })

  beforeEach(async () => {
    task = mockTaskModel()
    TaskRepositoryMemory.getRepository().entities = [task]
  })

  test('Should return ok status code if succeeds', async () => {
    const updateTaskDTO = mockTaskModel()
    await agent
      .put(getUrlWithId(task.id))
      .send(updateTaskDTO)
      .expect(HttpStatusCode.ok)
  })

  test('Should return unprocessableEntity status code if title is not provided', async () => {
    const updateTaskDTO = mockTaskModel()
    delete updateTaskDTO.title
    await agent
      .put(getUrlWithId(task.id))
      .send(updateTaskDTO)
      .expect(HttpStatusCode.unprocessableEntity)
  })

  test('Should return unprocessableEntity status code if description is not provided', async () => {
    const updateTaskDTO = mockTaskModel()
    delete updateTaskDTO.description
    await agent
      .put(getUrlWithId(task.id))
      .send(updateTaskDTO)
      .expect(HttpStatusCode.unprocessableEntity)
  })

  test('Should return unprocessableEntity status code if email is not provided', async () => {
    const updateTaskDTO = mockTaskModel()
    delete updateTaskDTO.email
    await agent
      .put(getUrlWithId(task.id))
      .send(updateTaskDTO)
      .expect(HttpStatusCode.unprocessableEntity)
  })
})
