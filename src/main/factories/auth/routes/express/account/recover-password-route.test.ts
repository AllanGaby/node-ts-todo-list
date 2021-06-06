import app from '@/main/config/express/app'
import { mockCreateUserAccount, CreatePublicEncryptedToken, mockCreateJsonWebToken } from '@/main/factories/auth/mocks'
import { AccountRepositoryMemory } from '@/infrastructure/auth/repositories/account/memory'
import { HttpStatusCode } from '@/presentation/common/protocols'
import { Config } from '@/main/config/environment'
import { AccountModel } from '@/domain/auth'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'
import faker from 'faker'

const url = '/api/auth/account/recover-password'
let validJWTToRecoverPassword: string
let account: AccountModel
let server: http.Server
let agent: SuperAgentTest

describe('PATCH /account/recover-password - Recover User Account Password', () => {
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
    validJWTToRecoverPassword = await mockCreateJsonWebToken(Config.criptography.privateKey, {
      payload: {
        id: account.id,
        name: account.name,
        email: account.email
      },
      subject: account.id
    })
  })

  test('Should return noContent status code if succeeds', async () => {
    const password = faker.internet.password()
    await agent
      .patch(url)
      .send({
        token: CreatePublicEncryptedToken(Config.criptography.publicKey, {
          token: validJWTToRecoverPassword,
          password,
          password_confirmation: password
        })
      })
      .expect(HttpStatusCode.noContent)
  })

  test('Should return unprocessableEntity status code if token is not provide', async () => {
    const password = faker.internet.password()
    await agent
      .patch(url)
      .send({
        token: CreatePublicEncryptedToken(Config.criptography.publicKey, {
          password,
          password_confirmation: password
        })
      })
      .expect(HttpStatusCode.unprocessableEntity)
  })

  test('Should return unprocessableEntity status code if password is not provide', async () => {
    await agent
      .patch(url)
      .send({
        token: CreatePublicEncryptedToken(Config.criptography.publicKey, {
          token: validJWTToRecoverPassword,
          password_confirmation: faker.internet.password()
        })
      })
      .expect(HttpStatusCode.unprocessableEntity)
  })

  test('Should return unprocessableEntity status code if password_confirmation is not provide', async () => {
    await agent
      .patch(url)
      .send({
        token: CreatePublicEncryptedToken(Config.criptography.publicKey, {
          token: validJWTToRecoverPassword,
          password: faker.internet.password()
        })
      })
      .expect(HttpStatusCode.unprocessableEntity)
  })
})
