import { GetUserAccountByEmailRepository } from '@/data/auth/repositories'
import { AccountModel, mockAccountModel } from '@/domain/auth'

export class GetUserAccountByEmailRepositorySpy implements GetUserAccountByEmailRepository {
  email: string
  account: AccountModel = mockAccountModel()

  async getByEmail (email: string): Promise<AccountModel> {
    this.email = email
    return this.account
  }
}
