import { AccountType } from '@/domain/auth'

export type AccessTokenPayloadModel = {
  sessionId: string
  accountId: string
  name: string
  email: string
  accountType: AccountType
}
