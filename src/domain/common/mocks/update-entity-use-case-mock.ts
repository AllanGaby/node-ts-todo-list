import { UpdateEntityUseCase, UpdateEntityDTO } from '@/domain/common'

export class UpdateEntityUseCaseSpy<EntityType> implements UpdateEntityUseCase<EntityType> {
  entityId: string
  params: UpdateEntityDTO<EntityType>
  entity: EntityType

  async update (entityId: string, params: UpdateEntityDTO<EntityType>): Promise<EntityType> {
    this.entityId = entityId
    this.params = params
    return this.entity
  }
}
