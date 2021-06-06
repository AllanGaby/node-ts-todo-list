import app from '@/main/config/express/app'
import { AccessTokenModel, AccountModel } from '@/domain/auth'
import { HttpStatusCode } from '@/presentation/common/protocols'
import { CreatePublicEncryptedToken, mockCreateUserAccount } from '@/main/factories/auth/mocks'
import { AccountRepositoryMemory } from '@/infrastructure/auth/repositories/account/memory'
import { Config } from '@/main/config/environment'
import { mockUpdateUserAccountRequest } from '@/presentation/auth/mocks'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'
import faker from 'faker'

const url = '/api/auth/account'
let validToken: string
let accessToken: AccessTokenModel
let server: http.Server
let agent: SuperAgentTest
let account: AccountModel
let password: string

describe('PUT /account - Update authenticated account', () => {
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
    password = faker.internet.password()
    account = await mockCreateUserAccount(password)
    validToken = CreatePublicEncryptedToken(Config.criptography.publicKey, {
      email: account.email,
      password: password
    })

    const response = await agent
      .post('/api/auth/session')
      .send({
        token: validToken
      })
    accessToken = response.body as AccessTokenModel
  })

  test('Should return ok status code if succeeds and update name', async () => {
    const request = mockUpdateUserAccountRequest()
    const response = await agent
      .put(url)
      .set(Config.auth.accessTokenName, accessToken.access_token)
      .send({
        token: CreatePublicEncryptedToken(Config.criptography.publicKey,
          {
            name: request.body.name
          })
      })
    expect(response.status).toBe(HttpStatusCode.ok)
    const account = response.body as AccountModel
    expect(account.name).toBe(request.body.name)
  })

  test('Should return ok status code if succeeds and update email', async () => {
    const request = mockUpdateUserAccountRequest()
    const response = await agent
      .put(url)
      .set(Config.auth.accessTokenName, accessToken.access_token)
      .send({
        token: CreatePublicEncryptedToken(Config.criptography.publicKey,
          {
            name: account.name,
            email: request.body.email
          })
      })
    expect(response.status).toBe(HttpStatusCode.ok)
    const accountUpdated = response.body as AccountModel
    expect(accountUpdated.email).toBe(request.body.email)
  })

  test('Should return unauthorized status code if old password is wrong', async () => {
    const request = mockUpdateUserAccountRequest()
    const newPassword = faker.internet.password()
    await agent
      .put(url)
      .set(Config.auth.accessTokenName, accessToken.access_token)
      .send({
        token: CreatePublicEncryptedToken(Config.criptography.publicKey,
          {
            name: account.name,
            email: request.body.email,
            old_password: faker.internet.password(),
            new_password: newPassword,
            new_password_confirmation: newPassword
          })
      })
      .expect(HttpStatusCode.unauthorized)
  })

  test('Should return unauthorized status code if old password is provided but not new password', async () => {
    const request = mockUpdateUserAccountRequest()
    await agent
      .put(url)
      .set(Config.auth.accessTokenName, accessToken.access_token)
      .send({
        token: CreatePublicEncryptedToken(Config.criptography.publicKey,
          {
            name: account.name,
            email: request.body.email,
            old_password: password
          })
      })
      .expect(HttpStatusCode.unprocessableEntity)
  })

  test('Should return unauthorized status code if new password is wrong', async () => {
    const request = mockUpdateUserAccountRequest()
    await agent
      .put(url)
      .set(Config.auth.accessTokenName, accessToken.access_token)
      .send({
        token: CreatePublicEncryptedToken(Config.criptography.publicKey,
          {
            name: account.name,
            email: request.body.email,
            old_password: password,
            new_password: faker.internet.password(),
            new_password_confirmation: faker.internet.password()
          })
      })
      .expect(HttpStatusCode.unprocessableEntity)
  })

  test('Should return unprocessableEntity status code if token is invalid', async () => {
    await agent
      .put(url)
      .set(Config.auth.accessTokenName, faker.random.uuid())
      .expect(HttpStatusCode.unprocessableEntity)
  })
})
