import app from '@/main/config/express/app'
import { HttpStatusCode } from '@/presentation/common/protocols'
import { TaskRepositoryMemory } from '@/infrastructure/todo-list/repositories/task/memory'
import { mockTaskModel, TaskModel } from '@/domain/todo-list'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'
import faker from 'faker'

const url = '/api/todo/task/'
let server: http.Server
let agent: SuperAgentTest
let task: TaskModel

const getUrlWithId = (taskId: string): string => {
  if (taskId) {
    return `${url}${taskId}/show`
  }
  return url
}

describe('GET /task/{:id}/show - Show Task By Id', () => {
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
    await agent
      .get(getUrlWithId(task.id))
      .expect(HttpStatusCode.ok)
  })

  test('Should return notFound status code if id is not provided', async () => {
    await agent
      .get(getUrlWithId(undefined))
      .expect(HttpStatusCode.notFound)
  })

  test('Should return notFound status code if id is not found', async () => {
    await agent
      .get(getUrlWithId(faker.random.number().toString()))
      .expect(HttpStatusCode.notFound)
  })
})
