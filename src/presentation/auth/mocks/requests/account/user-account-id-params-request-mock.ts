import { UserAccountIdParamsRequest } from '@/presentation/auth/requests'
import { HttpRequest } from '@/presentation/common/protocols'
import faker from 'faker'

export const mockUserAccountIdParamsRequest = (): HttpRequest<any, any, any, UserAccountIdParamsRequest> => ({
  params: {
    account_id: faker.random.uuid()
  }
})
