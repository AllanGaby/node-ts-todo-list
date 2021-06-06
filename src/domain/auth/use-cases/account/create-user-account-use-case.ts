import { AccountModel, CreateUserAccountDTO } from '@/domain/auth'
import { CreateEntityUseCase } from '@/domain/common'

export interface CreateUserAccountUseCase extends CreateEntityUseCase<AccountModel> {
  create: (params: CreateUserAccountDTO) => Promise<AccountModel>
}
