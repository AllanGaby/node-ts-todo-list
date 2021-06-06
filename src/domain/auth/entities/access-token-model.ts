import { AccountType } from './account-type'

export type AccessTokenModel = {
  access_token: string
  refresh_token: string
  name: string
  email: string
  account_type: AccountType
}
