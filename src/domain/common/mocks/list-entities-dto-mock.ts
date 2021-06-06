import { ListEntitiesDTO, mockOrderDirection } from '@/domain/common'
import faker from 'faker'

export const mockListEntitiesDTO = (): ListEntitiesDTO => ({
  textToSearch: faker.random.words(),
  orderColumn: faker.database.column(),
  orderDirection: mockOrderDirection(),
  page: faker.random.number(),
  recordsPerPage: faker.random.number()
})
