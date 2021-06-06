import { DeleteUserAccountAvatarUseCase, AccountModel } from '@/domain/auth'
import { GetEntityByIdRepository, UpdateEntityRepository } from '@/data/common/repositories'
import { DeleteStorageFile } from '@/data/common/protocols'
import { AccountIsNotFoundError } from '@/data/auth/errors'

export class DbDeleteUserAccountAvatarUseCase implements DeleteUserAccountAvatarUseCase {
  constructor (
    private readonly getAccountByIdRepository: GetEntityByIdRepository<AccountModel>,
    private readonly deleteStorageFile: DeleteStorageFile,
    private readonly updateAccountRepository: UpdateEntityRepository<AccountModel>
  ) {}

  async deleteAvatar (accountId: string): Promise<void> {
    const accountById = await this.getAccountByIdRepository.getById(accountId)
    if (!accountById) {
      throw new AccountIsNotFoundError()
    }
    if (accountById.avatar_path) {
      await this.deleteStorageFile.delete({
        filePath: accountById.avatar_path
      })
    }
    await this.updateAccountRepository.update({
      ...accountById,
      id: accountId,
      avatar_path: undefined
    })
  }
}
