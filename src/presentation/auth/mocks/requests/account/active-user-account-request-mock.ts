import { ActiveUserAccountRequest } from '@/presentation/auth/requests'
import { HttpRequest } from '@/presentation/common/protocols'
import faker from 'faker'

export const mockActiveUserAccountRequest = (): HttpRequest<any, any, ActiveUserAccountRequest> => ({
  params: {
    account_id: faker.random.uuid()
  }
})
