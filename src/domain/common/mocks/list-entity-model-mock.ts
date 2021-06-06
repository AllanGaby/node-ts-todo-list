import { ListEntityModel } from '@/domain/common'
import faker from 'faker'

export const mockListEntityModel = <EntityType>(): ListEntityModel<EntityType> => ({
  data: [
    faker.random.objectElement<EntityType>(),
    faker.random.objectElement<EntityType>(),
    faker.random.objectElement<EntityType>()
  ],
  last_page: faker.random.number(),
  page: faker.random.number(),
  record_count: faker.random.number()
})
