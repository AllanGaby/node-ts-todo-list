import { SendActiveAccountMailDTO } from '@/domain/auth'
import faker from 'faker'

export const mockSendActiveAccountMailDTO = (): SendActiveAccountMailDTO => ({
  subject: faker.random.words(),
  accountId: faker.random.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email()
})
