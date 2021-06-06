import { mockAccountType, AccessTokenPayloadModel } from '@/domain/auth'
import faker from 'faker'

export const mockAccessTokenPayloadModel = (accountId: string = faker.random.uuid(), sessionId: string = faker.random.uuid()): AccessTokenPayloadModel => ({
  sessionId,
  accountId,
  name: faker.name.findName(),
  email: faker.internet.email(),
  accountType: mockAccountType()
})
