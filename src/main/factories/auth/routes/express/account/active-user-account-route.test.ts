import app from '@/main/config/express/app'
import { AccountModel, mockAccountModel } from '@/domain/auth'
import { AccountRepositoryMemory } from '@/infrastructure/auth/repositories/account/memory'
import { HttpStatusCode } from '@/presentation/common/protocols'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'
import faker from 'faker'

const url = '/api/auth/account/active/'
let account: AccountModel
let server: http.Server
let agent: SuperAgentTest

describe('GET /account/active/:account_id - Active User Account', () => {
  beforeEach((done) => {
    server = app.listen(4000, (): void => {
      agent = supertest.agent(server)
      done()
    })
  })

  afterEach((done) => {
    return server && server.close(done)
  })

  beforeEach(() => {
    account = mockAccountModel()
    AccountRepositoryMemory.getRepository().entities = [account]
  })

  test('Should return noContent status code if succeeds', async () => {
    await agent
      .get(`${url}${account.id}`)
      .expect(HttpStatusCode.noContent)
  })

  test('Should return unauthorized status code if account is not found', async () => {
    await agent
      .get(`${url}${faker.random.uuid()}`)
      .expect(HttpStatusCode.unauthorized)
  })

  test('Should return notFound status code if account id is not provided', async () => {
    await agent
      .get(`${url}`)
      .expect(HttpStatusCode.notFound)
  })
})
