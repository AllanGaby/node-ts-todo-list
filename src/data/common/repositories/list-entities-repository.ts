import { OrderDirection } from '@/domain/common'

export type ListEntitiesRepositoryDTO = {
  textToSearch?: string
  recordsPerPage: number
  skip: number
  orderColumn?: string
  orderDirection?: OrderDirection
}

export interface ListEntitiesRepository<RecordType> {
  list: (filter: ListEntitiesRepositoryDTO) => Promise<RecordType[]>
}
