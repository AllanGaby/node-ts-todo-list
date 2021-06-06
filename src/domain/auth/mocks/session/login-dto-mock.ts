import { LoginDTO } from '@/domain/auth'
import faker from 'faker'

export const mockLoginDTO = (): LoginDTO => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
