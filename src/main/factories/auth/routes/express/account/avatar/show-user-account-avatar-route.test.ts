import app from '@/main/config/express/app'
import { Config } from '@/main/config/environment'
import { HttpStatusCode } from '@/presentation/common/protocols'
import { AccountRepositoryMemory } from '@/infrastructure/auth/repositories/account/memory'
import { mockCreateUserAccount } from '@/main/factories/auth/mocks'
import { AccountModel } from '@/domain/auth'
import path from 'path'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'
import faker from 'faker'

let server: http.Server
let agent: SuperAgentTest
let account: AccountModel

const getUrl = (profileId: string): string => {
  return `/api/auth/account/${profileId}/avatar`
}

describe('GET /auth/account/:account_id/avatar - Return a account avatar', () => {
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
    account.avatar_path = path.resolve(Config.uploadDir, 'accounts/avatar', 'test.jpg')
  })

  test('Should return ok status code if succeeds', async () => {
    await agent
      .get(getUrl(account.id))
      .expect(HttpStatusCode.ok)
  })

  test('Should return noContent status code if succeeds but account hasnt avatar_path', async () => {
    delete AccountRepositoryMemory.getRepository().entities[0].avatar_path
    await agent
      .get(getUrl(account.id))
      .expect(HttpStatusCode.noContent)
  })

  test('Should return notFound status code if profile is not found', async () => {
    await agent
      .get(getUrl(faker.random.uuid()))
      .expect(HttpStatusCode.notFound)
  })
})
