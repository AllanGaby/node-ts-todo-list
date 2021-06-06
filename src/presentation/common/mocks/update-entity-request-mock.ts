import { UpdateEntityRequest, EntityIdParamsRequestDefault } from '@/presentation/common/requests'
import { HttpRequest } from '@/presentation/common/protocols'
import faker from 'faker'

export const mockUpdateEntityRequest = (): HttpRequest<UpdateEntityRequest<object>, any, any, EntityIdParamsRequestDefault> => ({
  body: faker.random.objectElement<object>(),
  params: {
    id: faker.random.uuid()
  }
})
