import {
  GetEntityByIdRepository,
  DeleteEntityByIdRepository,
  ListEntitiesRepository,
  ListEntitiesRepositoryDTO,
  CreateEntityRepository,
  UpdateEntityRepository
} from '@/data/common/repositories'
import { EntityModel, CreateEntityDTO } from '@/domain/common'
import { v4 } from 'uuid'

export class CommonRepositoryMemory<EntityType extends EntityModel> implements GetEntityByIdRepository<EntityModel>, DeleteEntityByIdRepository<EntityModel>, ListEntitiesRepository<EntityModel>, CreateEntityRepository<EntityType>, UpdateEntityRepository<EntityType> {
  entities: EntityType[]

  constructor (private readonly columnsToListFilter: string[]) {
    this.entities = []
  }

  async getById (entityId: string): Promise<EntityType> {
    return this.entities.find(entity => entity.id === entityId)
  }

  async deleteById (entityId: string): Promise<EntityModel | undefined> {
    this.entities = this.entities.filter(entity => entity.id !== entityId)
    return undefined
  }

  async list (filter: ListEntitiesRepositoryDTO): Promise<EntityType[]> {
    if (filter.textToSearch) {
      return this.entities.filter(entitie => entitie[this.columnsToListFilter[0]].includes(filter.textToSearch))
    }
    return this.entities
  }

  async create (params: CreateEntityDTO<EntityType>): Promise<EntityType> {
    const entity = {
      ...params,
      id: v4(),
      created_at: new Date(),
      updated_at: new Date()
    }
    this.entities.push(entity as EntityType)
    return entity as EntityType
  }

  async update (params: Partial<EntityType>): Promise<EntityType> {
    const index = this.entities.findIndex(entity => entity.id === params.id)
    if (index >= 0) {
      this.entities[index] = {
        ...this.entities[index],
        ...params,
        updated_at: new Date()
      }
      return this.entities[index]
    }
    return null
  }
}
