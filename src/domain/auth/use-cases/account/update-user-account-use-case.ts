import { AccountModel, UpdateUserAccountDTO } from '@/domain/auth'
import { UpdateEntityUseCase } from '@/domain/common'

export interface UpdateUserAccountUseCase extends UpdateEntityUseCase<AccountModel> {
  update: (accountId: string, params: UpdateUserAccountDTO) => Promise<AccountModel>
}
