import { UploadUserAccountAvatarUseCase, UploadUserAccountAvatarDTO, AccountModel } from '@/domain/auth'
import { GetEntityByIdRepository, UpdateEntityRepository } from '@/data/common/repositories'
import { DeleteStorageFile, UploadStorageFile } from '@/data/common/protocols'
import { AccountIsNotFoundError } from '@/data/auth/errors'
import path from 'path'

export class DbUploadUserAccountAvatarUseCase implements UploadUserAccountAvatarUseCase {
  constructor (
    private readonly getAccountByIdRepository: GetEntityByIdRepository<AccountModel>,
    private readonly deleteStorageFile: DeleteStorageFile,
    private readonly uploadDir: string,
    private readonly uploadStorageFile: UploadStorageFile,
    private readonly updateAccountRepository: UpdateEntityRepository<AccountModel>
  ) {}

  async upload (params: UploadUserAccountAvatarDTO): Promise<void> {
    const accountById = await this.getAccountByIdRepository.getById(params.account_id)
    if (!accountById) {
      throw new AccountIsNotFoundError()
    }
    if (accountById.avatar_path) {
      await this.deleteStorageFile.delete({
        filePath: accountById.avatar_path
      })
    }
    const avatarPath = path.resolve(this.uploadDir, `${accountById.id}${path.extname(params.avatar_path)}`)
    this.uploadStorageFile.upload({
      sourceFile: params.avatar_path,
      destinationFile: avatarPath
    })
    await this.updateAccountRepository.update({
      ...accountById,
      id: params.account_id,
      avatar_path: avatarPath
    })
  }
}
