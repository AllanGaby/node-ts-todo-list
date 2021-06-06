import { GetEntityByIdUseCase } from '@/domain/common'
import faker from 'faker'

export class GetEntityByIdUseCaseSpy<EntityType = object> implements GetEntityByIdUseCase<EntityType> {
  entityId: string
  entity: EntityType = faker.random.objectElement<EntityType>()

  async getById (entityId: string): Promise<EntityType> {
    this.entityId = entityId
    return this.entity
  }
}
