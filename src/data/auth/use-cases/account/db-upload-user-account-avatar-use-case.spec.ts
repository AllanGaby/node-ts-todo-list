import { DeleteStorageFileSpy, GetEntityByIdRepositorySpy, UpdateEntityRepositorySpy, UploadStorageFileSpy } from '@/data/common/mocks'
import { mockAccountModel, mockUploadUserAccountAvatarDTO, AccountModel } from '@/domain/auth'
import { DbUploadUserAccountAvatarUseCase } from './db-upload-user-account-avatar-use-case'
import { AccountIsNotFoundError } from '@/data/auth/errors'
import path from 'path'
import faker from 'faker'

type sutTypes = {
  sut: DbUploadUserAccountAvatarUseCase
  getProfileByIdRepository: GetEntityByIdRepositorySpy<AccountModel>
  updateProfileRepository: UpdateEntityRepositorySpy<AccountModel>
  uploadDir: string
  deleteStorageFile: DeleteStorageFileSpy
  uploadStorageFile: UploadStorageFileSpy
}

const makeSut = (): sutTypes => {
  const getProfileByIdRepository = new GetEntityByIdRepositorySpy<AccountModel>()
  getProfileByIdRepository.entity = mockAccountModel()
  const updateProfileRepository = new UpdateEntityRepositorySpy<AccountModel>()
  const uploadDir = faker.system.directoryPath()
  const deleteStorageFile = new DeleteStorageFileSpy()
  const uploadStorageFile = new UploadStorageFileSpy()
  const sut = new DbUploadUserAccountAvatarUseCase(getProfileByIdRepository, deleteStorageFile, uploadDir, uploadStorageFile, updateProfileRepository)
  return {
    sut,
    getProfileByIdRepository,
    deleteStorageFile,
    uploadDir,
    uploadStorageFile,
    updateProfileRepository
  }
}

describe('DbUploadUserAccountAvatarUseCase', () => {
  test('Should call GetProfileByIdRepository with correct value', async () => {
    const { sut, getProfileByIdRepository } = makeSut()
    const request = mockUploadUserAccountAvatarDTO()
    await sut.upload(request)
    expect(getProfileByIdRepository.entityId).toBe(request.account_id)
  })

  test('Should return AccountIsNotFoundError if GetProfileByIdRepository return undefined', async () => {
    const { sut, getProfileByIdRepository } = makeSut()
    getProfileByIdRepository.entity = undefined
    const promise = sut.upload(mockUploadUserAccountAvatarDTO())
    await expect(promise).rejects.toThrowError(AccountIsNotFoundError)
  })

  test('Should not call DeleteStorageFile profile hasnt avatar', async () => {
    const { sut, deleteStorageFile, getProfileByIdRepository } = makeSut()
    delete getProfileByIdRepository.entity.avatar_path
    const deleteSpy = jest.spyOn(deleteStorageFile, 'delete')
    await sut.upload(mockUploadUserAccountAvatarDTO())
    expect(deleteSpy).not.toHaveBeenCalled()
  })

  test('Should call DeleteStorageFile profile has avatar_path', async () => {
    const { sut, deleteStorageFile, getProfileByIdRepository } = makeSut()
    await sut.upload(mockUploadUserAccountAvatarDTO())
    expect(deleteStorageFile.params).toEqual({
      filePath: getProfileByIdRepository.entity.avatar_path
    })
  })

  test('Should call UploadStorageFile with correct values if avatar_path is provided', async () => {
    const { sut, uploadStorageFile, uploadDir, getProfileByIdRepository } = makeSut()
    const request = mockUploadUserAccountAvatarDTO()
    await sut.upload(request)
    expect(uploadStorageFile.uploadParams).toEqual({
      sourceFile: request.avatar_path,
      destinationFile: path.resolve(uploadDir, `${getProfileByIdRepository.entity.id}${path.extname(request.avatar_path)}`)
    })
  })

  test('Should call UpdateProfileRepository with correct values', async () => {
    const { sut, updateProfileRepository, getProfileByIdRepository, uploadDir } = makeSut()
    const request = mockUploadUserAccountAvatarDTO()
    await sut.upload(request)
    expect(updateProfileRepository.params).toEqual({
      ...getProfileByIdRepository.entity,
      id: request.account_id,
      avatar_path: path.resolve(uploadDir, `${getProfileByIdRepository.entity.id}${path.extname(request.avatar_path)}`)
    })
  })
})
