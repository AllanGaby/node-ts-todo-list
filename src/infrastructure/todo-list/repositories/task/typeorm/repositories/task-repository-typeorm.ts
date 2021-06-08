import { TaskEntity } from '@/infrastructure/todo-list/repositories/task/typeorm'
import { CommonRepositoryTypeORM } from '@/infrastructure/common/repositories'
import { getRepository } from 'typeorm'

export class TaskRepositoryTypeORM extends CommonRepositoryTypeORM<TaskEntity> {
  constructor () {
    super()
    this.repositoryTypeORM = getRepository<TaskEntity>(TaskEntity)
  }

  async update (params: Partial<TaskEntity>): Promise<TaskEntity> {
    const entity = await this.repositoryTypeORM.findOne(params.id)
    if (!entity) {
      return undefined
    }
    const updatedEntity: TaskEntity = {
      ...entity,
      ...params,
      change_to_pending: entity.change_to_pending + 1
    }
    await this.repositoryTypeORM.save<any>(updatedEntity)
    return updatedEntity
  }
}
