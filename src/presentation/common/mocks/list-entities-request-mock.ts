import { ListEntitiesRequest } from '@/presentation/common/requests'
import { HttpRequest } from '@/presentation/common/protocols'
import faker from 'faker'

export const mockListEntitiesRequest = <EntityType = object>(): HttpRequest<any, any, ListEntitiesRequest<EntityType>> => ({
  queryParams: faker.random.objectElement<EntityType>()
})
