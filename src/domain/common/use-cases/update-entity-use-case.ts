import { UpdateEntityDTO } from '@/domain/common'

export interface UpdateEntityUseCase<EntityType> {
  update: (entityId: string, params: UpdateEntityDTO<EntityType>) => Promise<EntityType>
}
