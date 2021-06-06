import { DbCreateUserAccountUseCase } from './db-create-user-account-use-case'
import { AccountType, mockCreateUserAccountDTO, mockAccountModel, mockAccountType, AccountModel } from '@/domain/auth'
import { GetUserAccountByEmailRepositorySpy, CreateHashSpy } from '@/data/auth/mocks'
import { CreateEntityRepositorySpy } from '@/data/common/mocks'
import { EmailInUseError } from '@/data/auth/errors'

type sutTypes = {
  sut: DbCreateUserAccountUseCase
  getUserAccountByEmailRepository: GetUserAccountByEmailRepositorySpy
  createHash: CreateHashSpy
  createUserAccountRepository: CreateEntityRepositorySpy<AccountModel>
  accountType: AccountType
}

const makeSut = (): sutTypes => {
  const getUserAccountByEmailRepository = new GetUserAccountByEmailRepositorySpy()
  getUserAccountByEmailRepository.account = undefined
  const createHash = new CreateHashSpy()
  const createUserAccountRepository = new CreateEntityRepositorySpy<AccountModel>()
  const accountType = mockAccountType()
  const sut = new DbCreateUserAccountUseCase(getUserAccountByEmailRepository, createHash, createUserAccountRepository, accountType)
  return {
    sut,
    getUserAccountByEmailRepository,
    createHash,
    createUserAccountRepository,
    accountType
  }
}

describe('DbCreateUserAccountUseCase', () => {
  test('Should call GetUserAccountByEmailRepository with correct value', async () => {
    const { sut, getUserAccountByEmailRepository } = makeSut()
    const request = mockCreateUserAccountDTO()
    await sut.create(request)
    expect(getUserAccountByEmailRepository.email).toBe(request.email)
  })

  test('Should return EmailIsInUseError if GetUserAccountByEmailRepository return an user account', async () => {
    const { sut, getUserAccountByEmailRepository } = makeSut()
    getUserAccountByEmailRepository.account = mockAccountModel()
    const request = mockCreateUserAccountDTO()
    const promise = sut.create(request)
    await expect(promise).rejects.toThrowError(EmailInUseError)
  })

  test('Should call CreateHash with correct value', async () => {
    const { sut, createHash } = makeSut()
    const request = mockCreateUserAccountDTO()
    await sut.create(request)
    expect(createHash.payload).toBe(request.password)
  })

  test('Should call CreateUserAccountRepository with correct value', async () => {
    const { sut, createHash, createUserAccountRepository, accountType } = makeSut()
    const request = mockCreateUserAccountDTO()
    await sut.create(request)
    expect(createUserAccountRepository.params).toEqual({
      name: request.name,
      email: request.email,
      password: createHash.token,
      type: accountType,
      email_validated: false
    })
  })

  test('Should return same CreateUserAccountRepository return if succeeds', async () => {
    const { sut, createUserAccountRepository } = makeSut()
    const account = await sut.create(mockCreateUserAccountDTO())
    expect(account).toEqual(createUserAccountRepository.entity)
  })
})
