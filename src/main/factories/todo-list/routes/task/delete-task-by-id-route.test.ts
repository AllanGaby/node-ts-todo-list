import app from '@/main/config/express/app'
import { HttpStatusCode } from '@/presentation/common/protocols'
import { TaskRepositoryMemory } from '@/infrastructure/todo-list/repositories/task/memory'
import { mockTaskModel, TaskModel } from '@/domain/todo-list'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/api/todo/task/'
let server: http.Server
let agent: SuperAgentTest
let task: TaskModel

describe('DELETE /task/{:id} - Delete Task By Id', () => {
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

  test('Should return noContent status code if succeeds', async () => {
    await agent
      .delete(`${url}${task.id}`)
      .expect(HttpStatusCode.noContent)
  })
})
