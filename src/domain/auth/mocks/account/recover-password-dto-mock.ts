import { RecoverPasswordDTO } from '@/domain/auth'
import faker from 'faker'

export const mockRecoverPasswordDTO = (): RecoverPasswordDTO => ({
  token: faker.random.uuid(),
  password: faker.internet.password()
})
