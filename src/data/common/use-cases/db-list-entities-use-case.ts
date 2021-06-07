import { ListEntitiesUseCase } from '@/domain/common'
import { ListEntitiesRepository } from '@/data/common/repositories'

export class DbListEntitiesUseCase<EntityType = object> implements ListEntitiesUseCase<EntityType> {
  constructor (
    private readonly listEntitiesRepository: ListEntitiesRepository<EntityType>
  ) {}

  async list (filter: Partial<EntityType>): Promise<EntityType[]> {
    return await this.listEntitiesRepository.list(filter)
  }
}
