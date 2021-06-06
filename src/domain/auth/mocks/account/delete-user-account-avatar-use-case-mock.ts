import { DeleteUserAccountAvatarUseCase } from '@/domain/auth'

export class DeleteUserAccountAvatarUseCaseSpy implements DeleteUserAccountAvatarUseCase {
  accountId: string

  async deleteAvatar (accountId: string): Promise<void> {
    this.accountId = accountId
  }
}
