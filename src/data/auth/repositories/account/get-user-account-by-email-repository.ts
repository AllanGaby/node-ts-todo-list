import { AccountModel } from '@/domain/auth'

export interface GetUserAccountByEmailRepository {
  getByEmail: (email: string) => Promise<AccountModel>
}
