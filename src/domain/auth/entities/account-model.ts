import { EntityModel } from '@/domain/common'
import { AccountType } from './account-type'

export type AccountModel = EntityModel & {
  name: string
  email: string
  password: string
  type: AccountType
  email_validated: boolean
  avatar_path?: string
}
