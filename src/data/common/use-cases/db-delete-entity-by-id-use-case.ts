import { DeleteEntityByIdUseCase } from '@/domain/common'
import { DeleteEntityByIdRepository } from '@/data/common/repositories'

export class DbDeleteEntityByIdUseCase<EntityType> implements DeleteEntityByIdUseCase<EntityType> {
  constructor (
    private readonly deleteEntityByIdRepository: DeleteEntityByIdRepository<EntityType>
  ) {}

  async deleteById (entityId: string): Promise<EntityType | undefined> {
    await this.deleteEntityByIdRepository.deleteById(entityId)
    return undefined
  }
}
