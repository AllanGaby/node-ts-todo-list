import { AccountModel } from '@/domain/auth'

export interface ActiveUserAccountUseCase {
  active: (accountId: string) => Promise<AccountModel>
}
