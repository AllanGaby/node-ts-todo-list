import { DbRecoverPasswordUseCase } from './db-recover-password-use-case'
import { DecryptWithSecretSpy, CreateHashSpy, DeleteSessionByAccountIdRepositorySpy } from '@/data/auth/mocks'
import { AccountModel, mockRecoverPasswordDTO } from '@/domain/auth'
import { GetEntityByIdRepositorySpy, UpdateEntityRepositorySpy, InvalidateCacheByPrefixSpy, throwError } from '@/data/common/mocks'
import { InvalidCredentialsError } from '@/data/auth/errors'

type sutTypes = {
  sut: DbRecoverPasswordUseCase
  decryptWithSecret: DecryptWithSecretSpy
  getUserAccountByIdRepository: GetEntityByIdRepositorySpy<AccountModel>
  createHash: CreateHashSpy
  updateUserAccountRepository: UpdateEntityRepositorySpy<AccountModel>
  deleteSessionByAccountIdRepository: DeleteSessionByAccountIdRepositorySpy
  invalidateCacheByPrefix: InvalidateCacheByPrefixSpy
}

const makeSut = (): sutTypes => {
  const decryptWithSecret = new DecryptWithSecretSpy()
  const getUserAccountByIdRepository = new GetEntityByIdRepositorySpy<AccountModel>()
  const createHash = new CreateHashSpy()
  const updateUserAccountRepository = new UpdateEntityRepositorySpy<AccountModel>()
  const deleteSessionByAccountIdRepository = new DeleteSessionByAccountIdRepositorySpy()
  const invalidateCacheByPrefix = new InvalidateCacheByPrefixSpy()
  const sut = new DbRecoverPasswordUseCase(decryptWithSecret, getUserAccountByIdRepository, createHash, updateUserAccountRepository, deleteSessionByAccountIdRepository, invalidateCacheByPrefix)
  return {
    sut,
    decryptWithSecret,
    getUserAccountByIdRepository,
    createHash,
    updateUserAccountRepository,
    deleteSessionByAccountIdRepository,
    invalidateCacheByPrefix
  }
}

describe('DbRecoverPasswordUseCase', () => {
  test('Should call DecryptWithSecret with correct values', async () => {
    const { sut, decryptWithSecret } = makeSut()
    const request = mockRecoverPasswordDTO()
    await sut.recoverPassword(request)
    expect(decryptWithSecret.token).toBe(request.token)
  })

  test('Should return InvalidCredentialsError if DecryptWithSecret throws a exception', async () => {
    const { sut, decryptWithSecret } = makeSut()
    jest.spyOn(decryptWithSecret, 'decrypt').mockImplementationOnce(throwError)
    const promise = sut.recoverPassword(mockRecoverPasswordDTO())
    await expect(promise).rejects.toThrowError(InvalidCredentialsError)
  })

  test('Should call GetUserAccountByIdRepository with correct value', async () => {
    const { sut, getUserAccountByIdRepository, decryptWithSecret } = makeSut()
    await sut.recoverPassword(mockRecoverPasswordDTO())
    expect(getUserAccountByIdRepository.entityId).toBe(decryptWithSecret.decryptedModel.subject)
  })

  test('Should return InvalidCredentialsError if GetUserAccountByIdRepository return undefined', async () => {
    const { sut, getUserAccountByIdRepository } = makeSut()
    getUserAccountByIdRepository.entity = undefined
    const promise = sut.recoverPassword(mockRecoverPasswordDTO())
    await expect(promise).rejects.toThrowError(InvalidCredentialsError)
  })

  test('Should call CreateHash with correct value', async () => {
    const { sut, createHash } = makeSut()
    const request = mockRecoverPasswordDTO()
    await sut.recoverPassword(request)
    expect(createHash.payload).toBe(request.password)
  })

  test('Should call UpdateUserAccountRepository with correct value', async () => {
    const { sut, updateUserAccountRepository, getUserAccountByIdRepository, createHash } = makeSut()
    await sut.recoverPassword(mockRecoverPasswordDTO())
    expect(updateUserAccountRepository.params).toEqual({
      id: getUserAccountByIdRepository.entity.id,
      name: getUserAccountByIdRepository.entity.name,
      email: getUserAccountByIdRepository.entity.email,
      password: createHash.token,
      email_validated: getUserAccountByIdRepository.entity.email_validated,
      type: getUserAccountByIdRepository.entity.type
    })
  })

  test('Should call DeleteSessionByAccountIdRepository with correct value', async () => {
    const { sut, getUserAccountByIdRepository, deleteSessionByAccountIdRepository } = makeSut()
    await sut.recoverPassword(mockRecoverPasswordDTO())
    expect(deleteSessionByAccountIdRepository.accountId).toBe(getUserAccountByIdRepository.entity.id)
  })

  test('Should call InvalidateCacheByPrefix with correct value', async () => {
    const { sut, getUserAccountByIdRepository, invalidateCacheByPrefix } = makeSut()
    await sut.recoverPassword(mockRecoverPasswordDTO())
    expect(invalidateCacheByPrefix.prefix).toBe(`account:${getUserAccountByIdRepository.entity.id}`)
  })
})
