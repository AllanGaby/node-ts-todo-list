import { CreateEntityRepository, UpdateEntityRepository, DeleteEntityByIdRepository, GetEntityByIdRepository, CountEntitiesRepository, ListEntitiesRepository } from '@/data/common/repositories'

export type CommonRepositoryType<EntityType> =
CreateEntityRepository<EntityType> |
UpdateEntityRepository<EntityType> |
DeleteEntityByIdRepository<EntityType> |
GetEntityByIdRepository<EntityType> |
CountEntitiesRepository<EntityType> |
ListEntitiesRepository<EntityType>
