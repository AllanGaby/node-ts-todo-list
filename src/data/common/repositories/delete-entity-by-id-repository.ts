export interface DeleteEntityByIdRepository<EntityType> {
  deleteById: (entityId: string) => Promise<EntityType | undefined>
}
