import { CreateUserAccountAndSendMailRequest } from '@/presentation/auth/requests'
import { HttpRequest } from '@/presentation/common/protocols'
import faker from 'faker'

export const mockCreateUserAccountAndSendMailRequest = (): HttpRequest<CreateUserAccountAndSendMailRequest> => {
  const password = faker.internet.password()
  return {
    body: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
      password_confirmation: password
    }
  }
}
