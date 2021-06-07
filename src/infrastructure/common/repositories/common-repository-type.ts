import { CreateEntityRepository, UpdateEntityRepository, DeleteEntityByIdRepository, GetEntityByIdRepository, ListEntitiesRepository } from '@/data/common/repositories'

export type CommonRepositoryType<EntityType> =
CreateEntityRepository<EntityType> |
UpdateEntityRepository<EntityType> |
DeleteEntityByIdRepository<EntityType> |
GetEntityByIdRepository<EntityType> |
ListEntitiesRepository<EntityType>
