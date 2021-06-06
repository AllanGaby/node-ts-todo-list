export interface UpdateEntityRepository<EntityType> {
  update: (params: Partial<EntityType>) => Promise<EntityType>
}
