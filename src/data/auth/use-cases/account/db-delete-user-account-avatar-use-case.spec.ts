import { DeleteStorageFileSpy, GetEntityByIdRepositorySpy, UpdateEntityRepositorySpy } from '@/data/common/mocks'
import { mockAccountModel, AccountModel } from '@/domain/auth'
import { DbDeleteUserAccountAvatarUseCase } from './db-delete-user-account-avatar-use-case'
import { AccountIsNotFoundError } from '@/data/auth/errors'
import faker from 'faker'

type sutTypes = {
  sut: DbDeleteUserAccountAvatarUseCase
  getProfileByIdRepository: GetEntityByIdRepositorySpy<AccountModel>
  updateProfileRepository: UpdateEntityRepositorySpy<AccountModel>
  deleteStorageFile: DeleteStorageFileSpy
}

const makeSut = (): sutTypes => {
  const getProfileByIdRepository = new GetEntityByIdRepositorySpy<AccountModel>()
  getProfileByIdRepository.entity = mockAccountModel()
  const updateProfileRepository = new UpdateEntityRepositorySpy<AccountModel>()
  const deleteStorageFile = new DeleteStorageFileSpy()
  const sut = new DbDeleteUserAccountAvatarUseCase(getProfileByIdRepository, deleteStorageFile, updateProfileRepository)
  return {
    sut,
    getProfileByIdRepository,
    deleteStorageFile,
    updateProfileRepository
  }
}

describe('DbDeleteUserAccountAvatarUseCase', () => {
  test('Should call GetProfileByIdRepository with correct value', async () => {
    const { sut, getProfileByIdRepository } = makeSut()
    const accountId = faker.random.uuid()
    await sut.deleteAvatar(accountId)
    expect(getProfileByIdRepository.entityId).toBe(accountId)
  })

  test('Should return AccountIsNotFoundError if GetProfileByIdRepository return undefined', async () => {
    const { sut, getProfileByIdRepository } = makeSut()
    getProfileByIdRepository.entity = undefined
    const promise = sut.deleteAvatar(faker.random.uuid())
    await expect(promise).rejects.toThrowError(AccountIsNotFoundError)
  })

  test('Should not call DeleteStorageFile profile hasnt avatar', async () => {
    const { sut, deleteStorageFile, getProfileByIdRepository } = makeSut()
    delete getProfileByIdRepository.entity.avatar_path
    const deleteSpy = jest.spyOn(deleteStorageFile, 'delete')
    await sut.deleteAvatar(faker.random.uuid())
    expect(deleteSpy).not.toHaveBeenCalled()
  })

  test('Should call DeleteStorageFile profile has avatar_path', async () => {
    const { sut, deleteStorageFile, getProfileByIdRepository } = makeSut()
    await sut.deleteAvatar(faker.random.uuid())
    expect(deleteStorageFile.params).toEqual({
      filePath: getProfileByIdRepository.entity.avatar_path
    })
  })

  test('Should call UpdateProfileRepository with correct values', async () => {
    const { sut, updateProfileRepository, getProfileByIdRepository } = makeSut()
    const accointId = faker.random.uuid()
    await sut.deleteAvatar(accointId)
    expect(updateProfileRepository.params).toEqual({
      ...getProfileByIdRepository.entity,
      id: accointId,
      avatar_path: undefined
    })
  })
})
