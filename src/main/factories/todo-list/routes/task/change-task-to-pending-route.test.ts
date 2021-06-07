import app from '@/main/config/express/app'
import { HttpStatusCode } from '@/presentation/common/protocols'
import { TaskRepositoryMemory } from '@/infrastructure/todo-list/repositories/task/memory'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'
import { mockTaskModel, TaskModel } from '@/domain/todo-list'
import { mockChangeTaskToPendingRequest } from '@/presentation/todo-list/mocks'

const url = '/api/todo/task/'
let server: http.Server
let agent: SuperAgentTest
let task: TaskModel

const getUrlWithId = (taskId: string): string => {
  if (taskId) {
    return `${url}${taskId}/pending`
  }
  return url
}

describe('PUT /task/:id/pending - Update a Task to pending', () => {
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
    const changeTaskToPendingDTO = mockChangeTaskToPendingRequest()
    await agent
      .put(getUrlWithId(task.id))
      .send(changeTaskToPendingDTO.body)
      .expect(HttpStatusCode.ok)
  })

  test('Should return unprocessableEntity status code if password is not provided', async () => {
    const changeTaskToPendingDTO = mockChangeTaskToPendingRequest()
    delete changeTaskToPendingDTO.body.password
    await agent
      .put(getUrlWithId(task.id))
      .send(changeTaskToPendingDTO)
      .expect(HttpStatusCode.unprocessableEntity)
  })
})
