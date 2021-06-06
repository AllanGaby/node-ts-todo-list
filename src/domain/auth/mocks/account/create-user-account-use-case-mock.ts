import { CreateUserAccountUseCase, CreateUserAccountDTO, AccountModel, mockAccountModel } from '@/domain/auth'

export class CreateUserAccountUseCaseSpy implements CreateUserAccountUseCase {
  params: CreateUserAccountDTO
  account: AccountModel = mockAccountModel()

  async create (params: CreateUserAccountDTO): Promise<AccountModel> {
    this.params = params
    return this.account
  }
}
