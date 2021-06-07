import {
  GetEntityByIdRepository,
  DeleteEntityByIdRepository,
  CreateEntityRepository,
  UpdateEntityRepository
} from '@/data/common/repositories'
import { CreateEntityDTO } from '@/domain/common'
import { DeepPartial, Repository } from 'typeorm'
import { DefaultEntity } from '@/infrastructure/common/repositories'

export class CommonRepositoryTypeORM<EntityType extends DefaultEntity> implements GetEntityByIdRepository<EntityType>, DeleteEntityByIdRepository<EntityType>, CreateEntityRepository<EntityType>, UpdateEntityRepository<EntityType> {
  public repositoryTypeORM: Repository<EntityType>

  async getById (entityId: string): Promise<EntityType> {
    return await this.repositoryTypeORM.findOne(entityId)
  }

  async deleteById (entityId: string): Promise<EntityType | undefined> {
    await this.repositoryTypeORM.delete(entityId)
    return undefined
  }

  async list (filter: Partial<EntityType>): Promise<EntityType[]> {
    return await this.repositoryTypeORM.find({
      where: filter
    })
  }

  async create (params: CreateEntityDTO<EntityType>): Promise<EntityType> {
    const createdEntity = this.repositoryTypeORM.create(params as DeepPartial<EntityType>)
    await this.repositoryTypeORM.save<any>(createdEntity)
    return createdEntity
  }

  async update (params: Partial<EntityType>): Promise<EntityType> {
    const entity = await this.repositoryTypeORM.findOne(params.id)
    if (!entity) {
      return undefined
    }
    const updatedEntity = {
      ...entity,
      ...params
    }
    await this.repositoryTypeORM.save<any>(updatedEntity)
    return updatedEntity
  }
}
