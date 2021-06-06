import { CreateEntityRequest } from '@/presentation/common/requests'
import { HttpRequest } from '@/presentation/common/protocols'
import faker from 'faker'

export const mockCreateEntityRequest = (): HttpRequest<CreateEntityRequest<object>> => ({
  body: faker.random.objectElement<object>()
})
