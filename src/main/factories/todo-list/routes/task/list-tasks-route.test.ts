import app from '@/main/config/express/app'
import { HttpStatusCode } from '@/presentation/common/protocols'
import { TaskRepositoryMemory } from '@/infrastructure/todo-list/repositories/task/memory'
import { mockTaskModel } from '@/domain/todo-list'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/api/todo/task/list'
let server: http.Server
let agent: SuperAgentTest

describe('GET /task/list - List Tasks', () => {
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
    TaskRepositoryMemory.getRepository().entities = [
      mockTaskModel(),
      mockTaskModel(),
      mockTaskModel(),
      mockTaskModel()
    ]
  })

  test('Should return ok status code if succeeds', async () => {
    await agent
      .get(url)
      .expect(HttpStatusCode.ok)
  })
})
