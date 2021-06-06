import { CreateEntityRepository } from '@/data/common/repositories'
import { EntityModel, CreateEntityDTO } from '@/domain/common'

export class CreateEntityRepositorySpy<EntityType = EntityModel> implements CreateEntityRepository<EntityType> {
  params: CreateEntityDTO<EntityType>
  entity: EntityType

  async create (params: CreateEntityDTO<EntityType>): Promise<EntityType> {
    this.params = params
    return this.entity
  }
}
