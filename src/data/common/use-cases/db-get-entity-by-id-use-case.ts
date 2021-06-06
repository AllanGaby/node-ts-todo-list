import { GetEntityByIdUseCase } from '@/domain/common'
import { GetEntityByIdRepository } from '@/data/common/repositories'
import { EntityIsNotFoundError } from '@/data/common/errors'

export class DbGetEntityByIdUseCase<EntityType = object> implements GetEntityByIdUseCase<EntityType> {
  constructor (
    private readonly getEntityByIdRepository: GetEntityByIdRepository<EntityType>,
    private readonly entityName: string
  ) {}

  async getById (entityId: string): Promise<EntityType> {
    const entity = await this.getEntityByIdRepository.getById(entityId)
    if (!entity) {
      throw new EntityIsNotFoundError(this.entityName)
    }
    return entity
  }
}
