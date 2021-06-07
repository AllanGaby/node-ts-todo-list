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
    return `${url}${taskId}/concluded`
  }
  return url
}

describe('PUT /task/:id/concluded - Update a Task to concluded', () => {
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
      .put(getUrlWithId(task.id))
      .expect(HttpStatusCode.ok)
  })
})
