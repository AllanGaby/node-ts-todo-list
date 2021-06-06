import { CreateUserAccountDTO } from '@/domain/auth'
import faker from 'faker'

export const mockCreateUserAccountDTO = (): CreateUserAccountDTO => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})
