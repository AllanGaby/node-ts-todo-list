import { EntityIdParamsRequestDefault } from '@/presentation/common/requests'
import { HttpRequest } from '@/presentation/common/protocols'
import faker from 'faker'

export const mockEntityIdParamsRequestDefault = (): HttpRequest<any, any, any, EntityIdParamsRequestDefault> => ({
  params: {
    id: faker.random.uuid()
  }
})
