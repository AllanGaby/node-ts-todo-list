import { DbActiveUserAccountUseCase } from './db-active-user-account-use-case'
import { GetEntityByIdRepositorySpy, UpdateEntityRepositorySpy } from '@/data/common/mocks'
import { AccountIsNotFoundError } from '@/data/auth/errors'
import { AccountModel } from '@/domain/auth'
import faker from 'faker'

type sutTypes = {
  sut: DbActiveUserAccountUseCase
  getUserAccountByIdRepository: GetEntityByIdRepositorySpy<AccountModel>
  updateUserAccountRepository: UpdateEntityRepositorySpy<AccountModel>
}

const makeSut = (): sutTypes => {
  const getUserAccountByIdRepository = new GetEntityByIdRepositorySpy<AccountModel>()
  const updateUserAccountRepository = new UpdateEntityRepositorySpy<AccountModel>()
  const sut = new DbActiveUserAccountUseCase(getUserAccountByIdRepository, updateUserAccountRepository)
  return {
    sut,
    getUserAccountByIdRepository,
    updateUserAccountRepository
  }
}

describe('DbActiveUserAccountUseCase', () => {
  test('Should call GetUserAccountByIdRepository with correct value', async () => {
    const { sut, getUserAccountByIdRepository } = makeSut()
    const accountId = faker.random.uuid()
    await sut.active(accountId)
    expect(getUserAccountByIdRepository.entityId).toBe(accountId)
  })

  test('Should return AccountIsNotFoundError if GetUserAccountByIdRepository return undefined', async () => {
    const { sut, getUserAccountByIdRepository } = makeSut()
    getUserAccountByIdRepository.entity = undefined
    const promise = sut.active(faker.random.uuid())
    await expect(promise).rejects.toThrowError(AccountIsNotFoundError)
  })

  test('Should call UpdateUserAccountRepository with correct value', async () => {
    const { sut, getUserAccountByIdRepository, updateUserAccountRepository } = makeSut()
    await sut.active(faker.random.uuid())
    expect(updateUserAccountRepository.params).toEqual({
      id: getUserAccountByIdRepository.entity.id,
      name: getUserAccountByIdRepository.entity.name,
      email: getUserAccountByIdRepository.entity.email,
      password: getUserAccountByIdRepository.entity.password,
      email_validated: true,
      type: getUserAccountByIdRepository.entity.type
    })
  })

  test('Should return same UpdateUserAccountRepository returns if succeeds', async () => {
    const { sut, updateUserAccountRepository } = makeSut()
    const updatedAccount = await sut.active(faker.random.uuid())
    expect(updatedAccount).toEqual(updateUserAccountRepository.entity)
  })
})
