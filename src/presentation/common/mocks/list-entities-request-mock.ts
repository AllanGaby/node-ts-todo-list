import { mockOrderDirection } from '@/domain/common'
import { ListEntitiesRequest } from '@/presentation/common/requests'
import { HttpRequest } from '@/presentation/common/protocols'
import faker from 'faker'

export const mockListEntitiesRequest = (): HttpRequest<any, any, ListEntitiesRequest> => ({
  queryParams: {
    page: faker.random.number(),
    search: faker.random.words(),
    size: faker.random.number(),
    order: faker.database.column(),
    direction: mockOrderDirection()
  }
})
