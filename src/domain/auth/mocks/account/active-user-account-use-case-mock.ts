import { AccountModel, ActiveUserAccountUseCase } from '@/domain/auth'
import { mockAccountModel } from './user-account-mock'

export class ActiveUserAccountUseCaseSpy implements ActiveUserAccountUseCase {
  accountId: string
  account: AccountModel = mockAccountModel()

  async active (accountId: string): Promise<AccountModel> {
    this.accountId = accountId
    return this.account
  }
}
