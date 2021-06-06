import { mockAccessTokenPayloadModel } from '@/domain/auth'
import { UpdateUserAccountRequest } from '@/presentation/auth/requests'
import { HttpRequest } from '@/presentation/common/protocols'
import faker from 'faker'

export const mockUpdateUserAccountRequest = (): HttpRequest<UpdateUserAccountRequest> => ({
  body: {
    access_token: mockAccessTokenPayloadModel(),
    email: faker.internet.email(),
    name: faker.name.findName(),
    old_password: faker.internet.password(),
    new_password: faker.internet.password(),
    new_password_confirmation: faker.internet.password()
  }
})
