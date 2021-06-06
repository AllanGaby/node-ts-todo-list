export type ListEntityModel<EntityType> = {
  data: EntityType[]
  page: number
  last_page: number
  record_count: number
}
