import { DbRequestRecoverPasswordUseCase } from './db-request-recover-password-use-case'
import { EncryptWithSecretSpy, GetUserAccountByEmailRepositorySpy } from '@/data/auth/mocks'
import { InvalidCredentialsError } from '@/data/auth/errors'
import { ContactModel, mockContactModel, SendMailToMessageQueueSpy } from '@/domain/comunication'
import faker from 'faker'

type sutTypes = {
  sut: DbRequestRecoverPasswordUseCase
  getUserAccountByEmailRepository: GetUserAccountByEmailRepositorySpy
  recoverPasswordTokenValidityInMinutes: number
  encryptWithSecret: EncryptWithSecretSpy
  recoverPasswordMailFilePath: string
  sendMailQueueName: string
  sender: ContactModel
  sendMailToMessageQueue: SendMailToMessageQueueSpy
}

const makeSut = (): sutTypes => {
  const getUserAccountByEmailRepository = new GetUserAccountByEmailRepositorySpy()
  const recoverPasswordTokenValidityInMinutes = faker.random.number({ max: 1440 })
  const encryptWithSecret = new EncryptWithSecretSpy()
  const recoverPasswordMailFilePath = faker.system.filePath()
  const sendMailQueueName = faker.random.uuid()
  const sender = mockContactModel()
  const sendMailToMessageQueue = new SendMailToMessageQueueSpy()
  const sut = new DbRequestRecoverPasswordUseCase(getUserAccountByEmailRepository, recoverPasswordTokenValidityInMinutes, encryptWithSecret, recoverPasswordMailFilePath, sendMailQueueName, sender, sendMailToMessageQueue)
  return {
    sut,
    getUserAccountByEmailRepository,
    recoverPasswordTokenValidityInMinutes,
    encryptWithSecret,
    recoverPasswordMailFilePath,
    sendMailQueueName,
    sender,
    sendMailToMessageQueue
  }
}

describe('DbRequestRecoverPasswordUseCase', () => {
  test('Should call GetUserAccountByEmailRepository with correct value', async () => {
    const { sut, getUserAccountByEmailRepository } = makeSut()
    const email = faker.internet.email()
    await sut.request(email)
    expect(getUserAccountByEmailRepository.email).toBe(email)
  })

  test('Should return InvalidCredentialsError if GetUserAccountByEmailRepository return undefined', async () => {
    const { sut, getUserAccountByEmailRepository } = makeSut()
    getUserAccountByEmailRepository.account = undefined
    const promise = sut.request(faker.internet.email())
    await expect(promise).rejects.toThrowError(InvalidCredentialsError)
  })

  test('Should call EncryptWithSecret with correct values to create access token', async () => {
    const { sut, encryptWithSecret, getUserAccountByEmailRepository, recoverPasswordTokenValidityInMinutes } = makeSut()
    const encryptSpy = jest.spyOn(encryptWithSecret, 'encrypt')
    await sut.request(faker.internet.email())
    expect(encryptSpy).toHaveBeenCalledWith({
      payload: {
        id: getUserAccountByEmailRepository.account.id,
        name: getUserAccountByEmailRepository.account.name,
        email: getUserAccountByEmailRepository.account.email
      },
      subject: getUserAccountByEmailRepository.account.id
    }, `${recoverPasswordTokenValidityInMinutes}m`)
  })

  test('Should call SendMailToMessageQueue with correct value', async () => {
    const { sut, sendMailToMessageQueue, getUserAccountByEmailRepository, recoverPasswordMailFilePath, sendMailQueueName, sender, encryptWithSecret } = makeSut()
    await sut.request(faker.internet.email())
    expect(sendMailToMessageQueue.params).toEqual({
      to: {
        name: getUserAccountByEmailRepository.account.name,
        email: getUserAccountByEmailRepository.account.email
      },
      subject: 'Welcome to back in Node TS Skeleton',
      queueName: sendMailQueueName,
      mailFilePath: recoverPasswordMailFilePath,
      sender: sender,
      variables: {
        accountId: getUserAccountByEmailRepository.account.id,
        name: getUserAccountByEmailRepository.account.name,
        token: encryptWithSecret.token
      }
    })
  })
})
