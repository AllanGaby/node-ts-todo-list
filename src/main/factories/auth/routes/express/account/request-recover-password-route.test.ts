import app from '@/main/config/express/app'
import { mockCreateUserAccount } from '@/main/factories/auth/mocks'
import { AccountRepositoryMemory } from '@/infrastructure/auth/repositories/account/memory'
import { HttpStatusCode } from '@/presentation/common/protocols'
import { AccountModel } from '@/domain/auth'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'
import faker from 'faker'

const url = '/api/auth/account/recover-password'
let account: AccountModel
let server: http.Server
let agent: SuperAgentTest

describe('POST /account/recover-password - Request recover password', () => {
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
    AccountRepositoryMemory.getRepository().entities = []
    account = await mockCreateUserAccount(faker.internet.password())
  })

  test('Should return noContent status code if succeeds', async () => {
    await agent
      .post(url)
      .send({
        email: account.email
      })
      .expect(HttpStatusCode.noContent)
  })

  test('Should return unprocessableEntity status code if token is not provide', async () => {
    await agent
      .post(url)
      .expect(HttpStatusCode.unprocessableEntity)
  })

  test('Should return unprocessableEntity status code if token is invalid', async () => {
    await agent
      .post(url)
      .send({
        token: faker.random.uuid()
      })
      .expect(HttpStatusCode.unprocessableEntity)
  })
})
