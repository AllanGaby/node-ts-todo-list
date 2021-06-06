import { AccountModel, UpdateUserAccountDTO, UpdateUserAccountUseCase, mockAccountModel } from '@/domain/auth'

export class UpdateUserAccountUseCaseSpy implements UpdateUserAccountUseCase {
  accountId: string
  params: UpdateUserAccountDTO
  account: AccountModel = mockAccountModel()

  async update (accountId: string, params: UpdateUserAccountDTO): Promise<AccountModel> {
    this.accountId = accountId
    this.params = params
    return this.account
  }
}
