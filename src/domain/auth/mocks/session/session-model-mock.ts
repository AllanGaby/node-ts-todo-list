import { SessionModel } from '@/domain/auth'
import faker from 'faker'

export const mockSessionModel = (accountId: string = faker.random.uuid()): SessionModel => ({
  id: faker.random.uuid(),
  account_id: accountId,
  created_at: faker.date.past(),
  updated_at: faker.date.past()
})
