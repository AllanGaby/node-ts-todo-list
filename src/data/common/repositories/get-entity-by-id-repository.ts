export interface GetEntityByIdRepository<EntityType = object> {
  getById: (entityId: string) => Promise<EntityType>
}
