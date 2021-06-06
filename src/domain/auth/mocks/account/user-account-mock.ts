import { AccountModel, mockAccountType } from '@/domain/auth'
import faker from 'faker'

export const mockAccountModel = (): AccountModel => ({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  type: mockAccountType(),
  email_validated: true,
  avatar_path: faker.system.filePath(),
  created_at: faker.date.past(),
  updated_at: faker.date.past()
})
