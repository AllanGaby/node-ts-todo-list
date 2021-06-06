import app from '@/main/config/express/app'
import { AccessTokenModel } from '@/domain/auth'
import { HttpStatusCode } from '@/presentation/common/protocols'
import { CreatePublicEncryptedToken, mockCreateUserAccount } from '@/main/factories/auth/mocks'
import { AccountRepositoryMemory } from '@/infrastructure/auth/repositories/account/memory'
import { Config } from '@/main/config/environment'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'
import faker from 'faker'

const url = '/api/auth/account'
let validToken: string
let accessToken: AccessTokenModel
let server: http.Server
let agent: SuperAgentTest

describe('GET /account - Recover a authenticated user account', () => {
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
      .post('/api/auth/session')
      .send({
        token: validToken
      })
    accessToken = response.body as AccessTokenModel
  })

  test('Should return ok status code if succeeds', async () => {
    await agent
      .get(url)
      .set(Config.auth.accessTokenName, accessToken.access_token)
      .expect(HttpStatusCode.ok)
  })

  test('Should return unauthorized status code if token is not provide', async () => {
    await agent
      .get(url)
      .expect(HttpStatusCode.unauthorized)
  })

  test('Should return unprocessableEntity status code if token is invalid', async () => {
    await agent
      .get(url)
      .set(Config.auth.accessTokenName, faker.random.uuid())
      .expect(HttpStatusCode.unprocessableEntity)
  })
})
