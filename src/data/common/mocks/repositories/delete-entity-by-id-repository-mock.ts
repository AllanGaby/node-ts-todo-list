import { DeleteEntityByIdRepository } from '@/data/common/repositories'

export class DeleteEntityByIdRepositorySpy<EntityType> implements DeleteEntityByIdRepository<EntityType> {
  entityId: string

  async deleteById (entityId: string): Promise<EntityType | undefined> {
    this.entityId = entityId
    return undefined
  }
}
