import { OrderDirection, ListEntityModel } from '@/domain/common'

export type ListEntitiesDTO = {
  textToSearch?: string
  recordsPerPage?: number
  page?: number
  orderColumn?: string
  orderDirection?: OrderDirection
}

export interface ListEntitiesUseCase<RecortType = any> {
  list: (filter: ListEntitiesDTO) => Promise<ListEntityModel<RecortType>>
}
