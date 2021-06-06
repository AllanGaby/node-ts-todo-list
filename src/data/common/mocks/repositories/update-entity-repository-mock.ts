import { UpdateEntityRepository } from '@/data/common/repositories'
import { EntityModel } from '@/domain/common'

export class UpdateEntityRepositorySpy<EntityType = EntityModel> implements UpdateEntityRepository<EntityType> {
  params: Partial<EntityType>
  entity: EntityType

  async update (params: Partial<EntityType>): Promise<EntityType> {
    this.params = params
    return this.entity
  }
}
