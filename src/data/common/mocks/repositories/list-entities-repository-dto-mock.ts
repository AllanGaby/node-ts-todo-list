import { ListEntitiesRepositoryDTO } from '@/data/common/repositories'
import { mockOrderDirection } from '@/domain/common'
import faker from 'faker'

export const mockListEntitiesRepositoryDTO = (): ListEntitiesRepositoryDTO => ({
  recordsPerPage: faker.random.number(),
  textToSearch: faker.random.words(),
  skip: faker.random.number(),
  orderDirection: mockOrderDirection(),
  orderColumn: faker.database.column()
})
