import { CreateEntityDTO } from '@/domain/common'

export interface CreateEntityUseCase<EntityType> {
  create: (params: CreateEntityDTO<EntityType>) => Promise<EntityType>
}
