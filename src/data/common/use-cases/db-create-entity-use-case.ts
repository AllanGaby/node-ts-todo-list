import { CreateEntityUseCase, CreateEntityDTO } from '@/domain/common'
import { CreateEntityRepository } from '@/data/common/repositories'

export class DbCreateEntityUseCase<EntityType> implements CreateEntityUseCase<EntityType> {
  constructor (
    private readonly createEntityRepository: CreateEntityRepository<EntityType>
  ) {}

  async create (params: CreateEntityDTO<EntityType>): Promise<EntityType> {
    return await this.createEntityRepository.create(params)
  }
}
