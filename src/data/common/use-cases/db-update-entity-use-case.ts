import { UpdateEntityUseCase, UpdateEntityDTO } from '@/domain/common'
import { UpdateEntityRepository } from '@/data/common/repositories'

export class DbUpdateEntityUseCase<EntityType> implements UpdateEntityUseCase<EntityType> {
  constructor (
    private readonly updateEntityRepository: UpdateEntityRepository<EntityType>
  ) {}

  async update (entityId: string, params: UpdateEntityDTO<EntityType>): Promise<EntityType> {
    return await this.updateEntityRepository.update({
      ...params,
      id: entityId
    })
  }
}
