import app from '@/main/config/express/app'
import { AccessTokenModel } from '@/domain/auth'
import { HttpStatusCode } from '@/presentation/common/protocols'
import { CreatePublicEncryptedToken, mockCreateUserAccount } from '@/main/factories/auth/mocks'
import { AccountRepositoryMemory } from '@/infrastructure/auth/repositories/account/memory'
import { Config } from '@/main/config/environment'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'
import faker from 'faker'

const url = '/api/auth/session'
let validToken: string
let accessToken: AccessTokenModel
let server: http.Server
let agent: SuperAgentTest

describe('DELETE /session - Logout', () => {
  beforeEach((done) => {
    server = app.listen(4000, (): void => {
      agent = supertest.agent(server)
      done()
    })
  })

  afterEach((done) => {
    return server && server.close(done)
  })

  beforeAll(async () => {
    AccountRepositoryMemory.getRepository().entities = []
    const password = faker.internet.password()
    const account = await mockCreateUserAccount(password)
    validToken = CreatePublicEncryptedToken(Config.criptography.publicKey, {
      email: account.email,
      password: password
    })
  })

  beforeEach(async () => {
    const response = await agent
      .post(url)
      .send({
        token: validToken
      })
    accessToken = response.body as AccessTokenModel
  })

  test('Should return noContent status code if succeeds', async () => {
    await agent
      .delete(url)
      .set(Config.auth.accessTokenName, accessToken.access_token)
      .expect(HttpStatusCode.noContent)
  })

  test('Should return unauthorized status code if token is not provide', async () => {
    await agent
      .delete(url)
      .expect(HttpStatusCode.unauthorized)
  })

  test('Should return unprocessableEntity status code if token is invalid', async () => {
    await agent
      .delete(url)
      .set(Config.auth.accessTokenName, faker.random.uuid())
      .expect(HttpStatusCode.unprocessableEntity)
  })
})
