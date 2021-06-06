import { UpdateEntityUseCase } from '@/domain/common'
import { UpdateEntityRepository } from '@/data/common/repositories'

export class DbUpdateEntityUseCase<UpdateDTOType, EntityType> implements UpdateEntityUseCase<EntityType> {
  constructor (
    private readonly updateEntityRepository: UpdateEntityRepository<EntityType>
  ) {}

  async update (entityId: string, params: UpdateDTOType): Promise<EntityType> {
    return await this.updateEntityRepository.update({
      ...params,
      id: entityId
    })
  }
}
