import { RecoverPasswordRequest } from '@/presentation/auth/requests'
import { HttpRequest } from '@/presentation/common/protocols'
import faker from 'faker'

export const mockRecoverPasswordRequest = (): HttpRequest<RecoverPasswordRequest> => ({
  body: {
    token: faker.random.uuid(),
    password: faker.internet.password(),
    password_confirmation: faker.internet.password()
  }
})
