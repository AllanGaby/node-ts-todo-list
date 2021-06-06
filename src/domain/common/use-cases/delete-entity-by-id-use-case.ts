export interface DeleteEntityByIdUseCase<EntityType> {
  deleteById: (entityId: string) => Promise<EntityType | undefined>
}
