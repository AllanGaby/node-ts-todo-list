import {
  GetEntityByIdRepository,
  DeleteEntityByIdRepository,
  ListEntitiesRepositoryDTO,
  CreateEntityRepository,
  UpdateEntityRepository
} from '@/data/common/repositories'
import { CreateEntityDTO } from '@/domain/common'
import { DeepPartial, Repository } from 'typeorm'
import { DefaultEntity } from '@/infrastructure/common/repositories'

export class CommonRepositoryTypeORM<EntityType extends DefaultEntity> implements GetEntityByIdRepository<EntityType>, DeleteEntityByIdRepository<EntityType>, CreateEntityRepository<EntityType>, UpdateEntityRepository<EntityType> {
  public repositoryTypeORM: Repository<EntityType>

  constructor (private readonly columnsToListFilter: string[]) { }

  async getById (entityId: string): Promise<EntityType> {
    return await this.repositoryTypeORM.findOne(entityId)
  }

  async deleteById (entityId: string): Promise<EntityType | undefined> {
    await this.repositoryTypeORM.delete(entityId)
    return undefined
  }

  async list ({ textToSearch, skip, recordsPerPage }: ListEntitiesRepositoryDTO): Promise<EntityType[]> {
    if (textToSearch) {
      const where = this.columnsToListFilter.reduce((where, column): string => {
        if (where) {
          return `${where} OR (${column} ilike '%${textToSearch}%')`
        }
        return `(${column} ilike '%${textToSearch}%')`
      }, '')

      return await this.repositoryTypeORM.find({
        where,
        skip,
        take: recordsPerPage
      })
    }
    return await this.repositoryTypeORM.find({
      skip,
      take: recordsPerPage
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
