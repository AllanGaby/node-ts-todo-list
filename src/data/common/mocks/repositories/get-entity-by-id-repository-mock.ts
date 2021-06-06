import { GetEntityByIdRepository } from '@/data/common/repositories'
import faker from 'faker'

export class GetEntityByIdRepositorySpy<EntityType = object> implements GetEntityByIdRepository<EntityType> {
  entityId: string
  entity: EntityType = faker.random.objectElement<EntityType>()

  async getById (entityId: string): Promise<EntityType> {
    this.entityId = entityId
    return this.entity
  }
}
