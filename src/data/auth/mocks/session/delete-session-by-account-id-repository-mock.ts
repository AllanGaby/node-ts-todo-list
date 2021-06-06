import { DeleteSessionByAccountIdRepository } from '@/data/auth/repositories'

export class DeleteSessionByAccountIdRepositorySpy implements DeleteSessionByAccountIdRepository {
  accountId: string

  async deleteByAccountId (accountId: string): Promise<void> {
    this.accountId = accountId
  }
}
