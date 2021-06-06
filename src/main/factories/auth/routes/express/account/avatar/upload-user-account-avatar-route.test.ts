import app from '@/main/config/express/app'
import { Config } from '@/main/config/environment'
import { HttpStatusCode } from '@/presentation/common/protocols'
import { AccountRepositoryMemory } from '@/infrastructure/auth/repositories/account/memory'
import { mockCreateUserAccount, CreatePublicEncryptedToken } from '@/main/factories/auth/mocks'
import { AccountModel, AccessTokenModel } from '@/domain/auth'
import path from 'path'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'
import faker from 'faker'

let server: http.Server
let agent: SuperAgentTest
let account: AccountModel
let validToken: string
let accessToken: AccessTokenModel

const getUrl = (accountId: string): string => {
  return `/api/auth/account/${accountId}/avatar`
}

const getFilePath = (fileName: string): string => {
  return path.resolve(Config.uploadDir, 'accounts/avatar', fileName)
}

describe('PUT /account/:account_id/avatar - Upload a account avatar', () => {
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
    const password = faker.internet.password()
    account = await mockCreateUserAccount(password)
    delete account.avatar_path
    validToken = CreatePublicEncryptedToken(Config.criptography.publicKey, {
      email: account.email,
      password: password
    })
  })

  beforeEach(async () => {
    const response = await agent
      .post('/api/auth/session')
      .send({
        token: validToken
      })
    accessToken = response.body as AccessTokenModel
  })

  test('Should return noContent status code if succeeds', async () => {
    await agent
      .patch(getUrl(account.id))
      .set(Config.auth.accessTokenName, accessToken.access_token)
      .attach('avatar_path', getFilePath('test.jpg'))
      .expect(HttpStatusCode.noContent)
  })

  test('Should return unprocessableEntity status code if avatar_path is not provided', async () => {
    await agent
      .patch(getUrl(account.id))
      .set(Config.auth.accessTokenName, accessToken.access_token)
      .expect(HttpStatusCode.unprocessableEntity)
  })

  test('Should return unauthorized status code if token is not provided', async () => {
    await agent
      .patch(getUrl(account.id))
      .attach('avatar_path', getFilePath('test.jpg'))
      .expect(HttpStatusCode.unauthorized)
  })

  test('Should return notFound status code if account is not found', async () => {
    await agent
      .patch(getUrl(faker.random.uuid()))
      .set(Config.auth.accessTokenName, accessToken.access_token)
      .attach('avatar_path', getFilePath('test.jpg'))
      .expect(HttpStatusCode.notFound)
  })
})
