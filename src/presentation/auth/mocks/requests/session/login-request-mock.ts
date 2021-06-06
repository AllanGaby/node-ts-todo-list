import { LoginRequest } from '@/presentation/auth/requests'
import { HttpRequest } from '@/presentation/common/protocols'
import faker from 'faker'

export const mockLoginRequest = (): HttpRequest<LoginRequest> => ({
  body: {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
})
