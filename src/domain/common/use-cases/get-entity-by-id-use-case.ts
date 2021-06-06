export interface GetEntityByIdUseCase<EntityType = object> {
  getById: (entityId: string) => Promise<EntityType>
}
