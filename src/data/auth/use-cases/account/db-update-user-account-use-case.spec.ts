import { DbUpdateUserAccountUseCase } from './db-update-user-account-use-case'
import { CompareHashSpy, CreateHashSpy, GetUserAccountByEmailRepositorySpy } from '@/data/auth/mocks'
import { AccountModel, mockAccountModel, mockUpdateUserAccountDTO } from '@/domain/auth'
import { GetEntityByIdRepositorySpy, SendToQueueSpy, UpdateEntityRepositorySpy } from '@/data/common/mocks'
import { HtmlTemplateParseSpy } from '@/data/comunication/mocks'
import { ContactModel, mockContactModel } from '@/domain/comunication'
import { EmailInUseError, InvalidCredentialsError } from '@/data/auth/errors'
import faker from 'faker'

type sutTypes = {
  sut: DbUpdateUserAccountUseCase
  getUserAccountByEmailRepository: GetUserAccountByEmailRepositorySpy
  getUserAccountByIdRepository: GetEntityByIdRepositorySpy<AccountModel>
  compareHash: CompareHashSpy
  createHash: CreateHashSpy
  updateUserAccountRepository: UpdateEntityRepositorySpy<AccountModel>
  changeEMailMailPath: string
  htmlTemplateParse: HtmlTemplateParseSpy
  sender: ContactModel
  queueName: string
  sendToQueue: SendToQueueSpy
}

const makeSut = (): sutTypes => {
  const getUserAccountByEmailRepository = new GetUserAccountByEmailRepositorySpy()
  getUserAccountByEmailRepository.account = undefined
  const getUserAccountByIdRepository = new GetEntityByIdRepositorySpy<AccountModel>()
  getUserAccountByIdRepository.entity = mockAccountModel()
  const compareHash = new CompareHashSpy()
  const createHash = new CreateHashSpy()
  const updateUserAccountRepository = new UpdateEntityRepositorySpy<AccountModel>()
  updateUserAccountRepository.entity = mockAccountModel()
  const changeEMailMailPath = faker.system.filePath()
  const htmlTemplateParse = new HtmlTemplateParseSpy()
  const sender = mockContactModel()
  const queueName = faker.random.uuid()
  const sendToQueue = new SendToQueueSpy()
  const sut = new DbUpdateUserAccountUseCase(getUserAccountByEmailRepository, getUserAccountByIdRepository, compareHash, createHash, changeEMailMailPath, updateUserAccountRepository, htmlTemplateParse, sender, sendToQueue, queueName)
  return {
    sut,
    getUserAccountByEmailRepository,
    getUserAccountByIdRepository,
    compareHash,
    createHash,
    updateUserAccountRepository,
    changeEMailMailPath,
    htmlTemplateParse,
    sender,
    queueName,
    sendToQueue
  }
}

describe('DbUpdateUserAccountUseCase', () => {
  test('Should call GetUserAccountByEmailRepository with correct value', async () => {
    const { sut, getUserAccountByEmailRepository } = makeSut()
    const request = mockUpdateUserAccountDTO()
    await sut.update(faker.random.uuid(), request)
    expect(getUserAccountByEmailRepository.email).toBe(request.email)
  })

  test('Should return EmailIsInUseError if GetUserAccountByEmailRepository return other account', async () => {
    const { sut, getUserAccountByEmailRepository } = makeSut()
    getUserAccountByEmailRepository.account = mockAccountModel()
    getUserAccountByEmailRepository.account.id = String(faker.random.number())
    const promise = sut.update(faker.random.uuid(), mockUpdateUserAccountDTO())
    await expect(promise).rejects.toThrowError(EmailInUseError)
  })

  test('Should call GetUserAccountByIdRepository if GetUserAccountByEmailRepository return a account with same id', async () => {
    const { sut, getUserAccountByEmailRepository, getUserAccountByIdRepository } = makeSut()
    const getByIdSpy = jest.spyOn(getUserAccountByIdRepository, 'getById')
    const accountId = faker.random.uuid()
    getUserAccountByEmailRepository.account = mockAccountModel()
    getUserAccountByEmailRepository.account.id = accountId
    await sut.update(accountId, mockUpdateUserAccountDTO())
    expect(getByIdSpy).toHaveBeenCalledWith(accountId)
  })

  test('Should return InvalidCredentialsError if GetUserAccountByIdRepository returns undefined', async () => {
    const { sut, getUserAccountByIdRepository } = makeSut()
    getUserAccountByIdRepository.entity = undefined
    const promise = sut.update(faker.random.uuid(), mockUpdateUserAccountDTO())
    await expect(promise).rejects.toThrowError(InvalidCredentialsError)
  })

  test('Should not call CompareHash if old_password is not provided', async () => {
    const { sut, compareHash } = makeSut()
    const compareSpy = jest.spyOn(compareHash, 'compare')
    const request = mockUpdateUserAccountDTO()
    delete request.old_password
    await sut.update(faker.random.uuid(), request)
    expect(compareSpy).not.toHaveBeenCalled()
  })

  test('Should call CompareHash with correct value if old_password is provided', async () => {
    const { sut, compareHash, getUserAccountByIdRepository } = makeSut()
    const request = mockUpdateUserAccountDTO()
    await sut.update(faker.random.uuid(), request)
    expect(compareHash.params).toEqual({
      payload: request.old_password,
      hash: getUserAccountByIdRepository.entity.password
    })
  })

  test('Should return InvalidCredentialsError if CompareHash fails', async () => {
    const { sut, compareHash } = makeSut()
    compareHash.result = false
    const promise = sut.update(faker.random.uuid(), mockUpdateUserAccountDTO())
    await expect(promise).rejects.toThrowError(InvalidCredentialsError)
  })

  test('Should not call CreateHash if new_password is not provided', async () => {
    const { sut, createHash } = makeSut()
    const hashSpy = jest.spyOn(createHash, 'hash')
    const request = mockUpdateUserAccountDTO()
    delete request.new_password
    await sut.update(faker.random.uuid(), request)
    expect(hashSpy).not.toHaveBeenCalled()
  })

  test('Should call CreateHash with correct value if new_password is provided', async () => {
    const { sut, createHash } = makeSut()
    const request = mockUpdateUserAccountDTO()
    await sut.update(faker.random.uuid(), request)
    expect(createHash.payload).toBe(request.new_password)
  })

  test('Should call UpdateUserAccountRepository with correct values if new_password and email is provided', async () => {
    const { sut, updateUserAccountRepository, createHash } = makeSut()
    const request = mockUpdateUserAccountDTO()
    const accountId = faker.random.uuid()
    await sut.update(accountId, request)
    expect(updateUserAccountRepository.params).toEqual({
      id: accountId,
      name: request.name,
      email: request.email,
      password: createHash.token,
      email_validated: false
    })
  })

  test('Should call UpdateUserAccountRepository with correct values if new_password is provided and email is not provided', async () => {
    const { sut, updateUserAccountRepository, createHash, getUserAccountByIdRepository } = makeSut()
    const request = mockUpdateUserAccountDTO()
    delete request.email
    const accountId = faker.random.uuid()
    await sut.update(accountId, request)
    expect(updateUserAccountRepository.params).toEqual({
      id: accountId,
      name: request.name,
      email: getUserAccountByIdRepository.entity.email,
      password: createHash.token,
      email_validated: getUserAccountByIdRepository.entity.email_validated
    })
  })

  test('Should call UpdateUserAccountRepository with correct values if email and new_password is not provided', async () => {
    const { sut, updateUserAccountRepository, getUserAccountByIdRepository } = makeSut()
    const request = mockUpdateUserAccountDTO()
    delete request.email
    delete request.new_password
    const accountId = faker.random.uuid()
    await sut.update(accountId, request)
    expect(updateUserAccountRepository.params).toEqual({
      id: accountId,
      name: request.name,
      email: getUserAccountByIdRepository.entity.email,
      password: getUserAccountByIdRepository.entity.password,
      email_validated: getUserAccountByIdRepository.entity.email_validated
    })
  })

  test('Should return same UpdateUserAccountRepository returns', async () => {
    const { sut, updateUserAccountRepository } = makeSut()
    const account = await sut.update(faker.random.uuid(), mockUpdateUserAccountDTO())
    expect(account).toEqual(updateUserAccountRepository.entity)
  })

  test('Should not call HttpTemplateParse if e-mail is not provided', async () => {
    const { sut, htmlTemplateParse } = makeSut()
    const parseSpy = jest.spyOn(htmlTemplateParse, 'parse')
    const request = mockUpdateUserAccountDTO()
    delete request.email
    await sut.update(faker.random.uuid(), request)
    expect(parseSpy).not.toHaveBeenCalled()
  })

  test('Should not call HttpTemplateParse if e-mail provided is equal to account e-mail', async () => {
    const { sut, htmlTemplateParse, getUserAccountByIdRepository } = makeSut()
    const request = mockUpdateUserAccountDTO()
    getUserAccountByIdRepository.entity.email = request.email
    const parseSpy = jest.spyOn(htmlTemplateParse, 'parse')
    await sut.update(faker.random.uuid(), request)
    expect(parseSpy).not.toHaveBeenCalled()
  })

  test('Should call HttpTemplateParse if e-mail is provided and different of account', async () => {
    const { sut, updateUserAccountRepository, htmlTemplateParse, changeEMailMailPath } = makeSut()
    const request = mockUpdateUserAccountDTO()
    await sut.update(faker.random.uuid(), request)
    expect(htmlTemplateParse.params).toEqual({
      filePath: changeEMailMailPath,
      variables: {
        accountId: updateUserAccountRepository.entity.id,
        name: updateUserAccountRepository.entity.name
      }
    })
  })

  test('Should call SendToQueue with correct value', async () => {
    const { sut, updateUserAccountRepository, sendToQueue, queueName, sender, htmlTemplateParse } = makeSut()
    await sut.update(faker.random.uuid(), mockUpdateUserAccountDTO())
    expect(sendToQueue.params).toEqual({
      queueName: queueName,
      params: {
        content: htmlTemplateParse.result,
        subject: '[NODE TS SKELETON] - Welcome to back',
        sender: sender,
        to: {
          name: updateUserAccountRepository.entity.name,
          email: updateUserAccountRepository.entity.email
        }
      }
    })
  })
})
