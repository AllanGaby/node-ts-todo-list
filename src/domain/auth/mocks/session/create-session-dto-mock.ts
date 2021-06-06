import { CreateSessionDTO } from '@/domain/auth'
import faker from 'faker'

export const mockCreateSessionDTO = (accountId: string = faker.random.uuid()): CreateSessionDTO => ({
  account_id: accountId
})
