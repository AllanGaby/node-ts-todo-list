import { OrderDirection } from '@/domain/common'

export type ListEntitiesRequest = {
  search?: string
  page?: number
  size?: number
  order?: string
  direction?: OrderDirection
}
