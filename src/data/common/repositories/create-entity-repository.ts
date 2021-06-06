import { CreateEntityDTO } from '@/domain/common'

export interface CreateEntityRepository<EntityType> {
  create: (params: CreateEntityDTO<EntityType>) => Promise<EntityType>
}
