import app from '@/main/config/express/app'
import { mockCreateUserAccount, CreatePublicEncryptedToken } from '@/main/factories/auth/mocks'
import { AccountRepositoryMemory } from '@/infrastructure/auth/repositories/account/memory'
import { HttpStatusCode } from '@/presentation/common/protocols'
import { mockCreateUserAccountAndSendMailRequest } from '@/presentation/auth/mocks'
import { Config } from '@/main/config/environment'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'
import faker from 'faker'

const url = '/api/auth/account'
let validToken: string
let server: http.Server
let agent: SuperAgentTest

describe('POST /account - Create User Account', () => {
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
    AccountRepositoryMemory.getRepository().entities = []
    const createUserAccountRequest = mockCreateUserAccountAndSendMailRequest()
    validToken = CreatePublicEncryptedToken(Config.criptography.publicKey, createUserAccountRequest.body)
  })

  test('Should return noContent status code if succeeds', async () => {
    await agent
      .post(url)
      .send({
        token: validToken
      })
      .expect(HttpStatusCode.noContent)
  })

  test('Should return conflict status code if email is in use', async () => {
    const password = faker.internet.password()
    const account = await mockCreateUserAccount(password)
    await agent
      .post(url)
      .send({
        token: CreatePublicEncryptedToken(Config.criptography.publicKey,
          {
            name: account.name,
            email: account.email,
            password: password,
            password_confirmation: password
          })
      })
      .expect(HttpStatusCode.conflict)
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
