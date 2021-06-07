import app from '@/main/config/express/app'
import { HttpStatusCode } from '@/presentation/common/protocols'
import { TaskRepositoryMemory } from '@/infrastructure/todo-list/repositories/task/memory'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'
import { mockTaskModel } from '@/domain/todo-list'

const url = '/api/todo/task/'
let server: http.Server
let agent: SuperAgentTest

describe('POST /task - Create a new Task', () => {
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
    TaskRepositoryMemory.getRepository().entities = []
  })

  test('Should return Created status code if succeeds', async () => {
    const createTaskDTO = mockTaskModel()
    await agent
      .post(url)
      .send(createTaskDTO)
      .expect(HttpStatusCode.created)
  })

  test('Should return unprocessableEntity status code if title is not provided', async () => {
    const createTaskDTO = mockTaskModel()
    delete createTaskDTO.title
    await agent
      .post(url)
      .send(createTaskDTO)
      .expect(HttpStatusCode.unprocessableEntity)
  })

  test('Should return unprocessableEntity status code if description is not provided', async () => {
    const createTaskDTO = mockTaskModel()
    delete createTaskDTO.description
    await agent
      .post(url)
      .send(createTaskDTO)
      .expect(HttpStatusCode.unprocessableEntity)
  })

  test('Should return unprocessableEntity status code if email is not provided', async () => {
    const createTaskDTO = mockTaskModel()
    delete createTaskDTO.email
    await agent
      .post(url)
      .send(createTaskDTO)
      .expect(HttpStatusCode.unprocessableEntity)
  })
})
