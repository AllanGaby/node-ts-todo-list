import { CreateEntityUseCase, CreateEntityDTO } from '@/domain/common'

export class CreateEntityUseCaseSpy<EntityType> implements CreateEntityUseCase<EntityType> {
  params: CreateEntityDTO<EntityType>
  entity: EntityType

  async create (params: CreateEntityDTO<EntityType>): Promise<EntityType> {
    this.params = params
    return this.entity
  }
}
