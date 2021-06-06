import { AccessTokenModel, AccountType } from '@/domain/auth'
import faker from 'faker'

export const mockAccessTokenModel = (accountType: AccountType = AccountType.standard): AccessTokenModel => ({
  access_token: faker.random.uuid(),
  refresh_token: faker.random.uuid(),
  account_type: accountType,
  name: faker.name.findName(),
  email: faker.internet.email()
})
