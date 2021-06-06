import { GetUserAccountByEmailRepository } from '@/data/auth/repositories'
import { CommonRepositoryMemory } from '@/infrastructure/common/repositories'
import { AccountModel } from '@/domain/auth'

export class AccountRepositoryMemory extends CommonRepositoryMemory<AccountModel> implements GetUserAccountByEmailRepository {
  public static instance: AccountRepositoryMemory

  public static getRepository (): AccountRepositoryMemory {
    if (!AccountRepositoryMemory.instance) {
      AccountRepositoryMemory.instance = new AccountRepositoryMemory(['name', 'email'])
    }
    return AccountRepositoryMemory.instance
  }

  async getByEmail (email: string): Promise<AccountModel> {
    return this.entities.find(account => account.email === email)
  }
}
