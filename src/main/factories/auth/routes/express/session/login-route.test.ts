import app from '@/main/config/express/app'
import { AccessTokenModel } from '@/domain/auth'
import { HttpStatusCode } from '@/presentation/common/protocols'
import { AccountRepositoryMemory } from '@/infrastructure/auth/repositories/account/memory'
import { CreatePublicEncryptedToken, mockCreateUserAccount } from '@/main/factories/auth/mocks'
import { Config } from '@/main/config/environment'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'
import faker from 'faker'

const url = '/api/auth/session'
let validToken: string
let server: http.Server
let agent: SuperAgentTest

describe('POST /session - Login', () => {
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
    const account = await mockCreateUserAccount(password)
    validToken = CreatePublicEncryptedToken(Config.criptography.publicKey, {
      email: account.email,
      password: password
    })
  })

  test('Should return created status code if succeeds', async () => {
    const response = await agent
      .post(url)
      .send({
        token: validToken
      })
    expect(response.status).toBe(HttpStatusCode.created)
    const accessToken = response.body as AccessTokenModel
    expect(accessToken.access_token).toBeTruthy()
    expect(accessToken.refresh_token).toBeTruthy()
    expect(accessToken.name).toBeTruthy()
    expect(accessToken.email).toBeTruthy()
    expect(accessToken.account_type).toBeTruthy()
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

  test('Should return UnprocessableEntity status code if password is not provided in token', async () => {
    await agent
      .post(url)
      .send({
        token: CreatePublicEncryptedToken(Config.criptography.publicKey, {
          email: faker.internet.email()
        })
      })
      .expect(HttpStatusCode.unprocessableEntity)
  })

  test('Should return UnprocessableEntity status code if email is not provided in token', async () => {
    await agent
      .post(url)
      .send({
        token: CreatePublicEncryptedToken(Config.criptography.publicKey, {
          password: faker.internet.password()
        })
      })
      .expect(HttpStatusCode.unprocessableEntity)
  })

  test('Should return unauthorized status code if credentials is invalid', async () => {
    await agent
      .post(url)
      .send({
        token: CreatePublicEncryptedToken(Config.criptography.publicKey, {
          email: faker.internet.email(),
          password: faker.internet.email()
        })
      })
      .expect(HttpStatusCode.unauthorized)
  })
})
