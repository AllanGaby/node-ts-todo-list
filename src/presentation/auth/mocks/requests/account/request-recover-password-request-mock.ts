import { RequestRecoverPasswordRequest } from '@/presentation/auth/requests'
import { HttpRequest } from '@/presentation/common/protocols'
import faker from 'faker'

export const mockRequestRecoverPasswordRequest = (): HttpRequest<RequestRecoverPasswordRequest> => ({
  body: {
    email: faker.internet.email()
  }
})
