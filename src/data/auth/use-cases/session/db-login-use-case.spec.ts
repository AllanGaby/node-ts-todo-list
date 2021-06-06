import { DbLoginUseCase } from './db-login-use-case'
import { CreateSessionUseCaseSpy, CreateAccessTokenUseCaseSpy, mockLoginDTO } from '@/domain/auth'
import { GetUserAccountByEmailRepositorySpy, CompareHashSpy } from '@/data/auth/mocks'
import { InvalidCredentialsError, InvalidStatusAccountError } from '@/data/auth/errors'
import { CreateCacheSpy } from '@/data/common/mocks'

type sutTypes = {
  sut: DbLoginUseCase
  getUserAccountByEmailRepository: GetUserAccountByEmailRepositorySpy
  compareHash: CompareHashSpy
  createSessionUseCase: CreateSessionUseCaseSpy
  createCache: CreateCacheSpy
  createAccessTokenUseCase: CreateAccessTokenUseCaseSpy
}

const makeSut = (): sutTypes => {
  const getUserAccountByEmailRepository = new GetUserAccountByEmailRepositorySpy()
  const compareHash = new CompareHashSpy()
  const createSessionUseCase = new CreateSessionUseCaseSpy()
  const createCache = new CreateCacheSpy()
  const createAccessTokenUseCase = new CreateAccessTokenUseCaseSpy()
  const sut = new DbLoginUseCase(getUserAccountByEmailRepository, compareHash, createSessionUseCase, createCache, createAccessTokenUseCase)
  return {
    sut,
    getUserAccountByEmailRepository,
    compareHash,
    createSessionUseCase,
    createCache,
    createAccessTokenUseCase
  }
}

describe('DbLoginUseCase', () => {
  test('Should call GetUserAccountByEmailRepository with correct value', async () => {
    const { sut, getUserAccountByEmailRepository } = makeSut()
    const request = mockLoginDTO()
    await sut.login(request)
    expect(getUserAccountByEmailRepository.email).toBe(request.email)
  })

  test('Should return InvalidCredentialsError if GetUserAccountByEmailRepository return undefined', async () => {
    const { sut, getUserAccountByEmailRepository } = makeSut()
    getUserAccountByEmailRepository.account = undefined
    const promise = sut.login(mockLoginDTO())
    await expect(promise).rejects.toThrowError(InvalidCredentialsError)
  })

  test('Should return InvalidStatusAccountError if GetUserAccountByEmailRepository return an account with e-mail invalidated', async () => {
    const { sut, getUserAccountByEmailRepository } = makeSut()
    getUserAccountByEmailRepository.account.email_validated = false
    const promise = sut.login(mockLoginDTO())
    await expect(promise).rejects.toThrowError(InvalidStatusAccountError)
  })

  test('Should call CompareHash with correct value', async () => {
    const { sut, getUserAccountByEmailRepository, compareHash } = makeSut()
    const request = mockLoginDTO()
    await sut.login(request)
    expect(compareHash.params).toEqual({
      payload: request.password,
      hash: getUserAccountByEmailRepository.account.password
    })
  })

  test('Should return InvalidCredentialsError if CompareHash return false', async () => {
    const { sut, compareHash } = makeSut()
    compareHash.result = false
    const promise = sut.login(mockLoginDTO())
    await expect(promise).rejects.toThrowError(InvalidCredentialsError)
  })

  test('Should call CreateSessionUseCase with correct value', async () => {
    const { sut, getUserAccountByEmailRepository, createSessionUseCase } = makeSut()
    await sut.login(mockLoginDTO())
    expect(createSessionUseCase.params).toEqual({
      account_id: getUserAccountByEmailRepository.account.id
    })
  })

  test('Should call CreateCache with correct value', async () => {
    const { sut, createSessionUseCase, createCache } = makeSut()
    await sut.login(mockLoginDTO())
    expect(createCache.params).toEqual({
      key: `account:${createSessionUseCase.session.account_id}&session:${createSessionUseCase.session.id}`,
      record: createSessionUseCase.session
    })
  })

  test('Should call CreateAccessTokenUseCase with correct value', async () => {
    const { sut, getUserAccountByEmailRepository, createSessionUseCase, createAccessTokenUseCase } = makeSut()
    await sut.login(mockLoginDTO())
    expect(createAccessTokenUseCase.params).toEqual({
      sessionId: createSessionUseCase.session.id,
      accountId: getUserAccountByEmailRepository.account.id,
      name: getUserAccountByEmailRepository.account.name,
      email: getUserAccountByEmailRepository.account.email,
      accountType: getUserAccountByEmailRepository.account.type
    })
  })

  test('Should return same CreateAccessTokenUseCase return if succeeds', async () => {
    const { sut, createAccessTokenUseCase } = makeSut()
    const accessToken = await sut.login(mockLoginDTO())
    expect(accessToken).toEqual(createAccessTokenUseCase.accessToken)
  })
})
