export type CreateEntityDTO<EntityType> = Omit<Omit<Omit<EntityType, 'id'>, 'created_at'>, 'updated_at'>
