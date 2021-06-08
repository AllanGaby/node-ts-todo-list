import { TaskEntity } from '@/infrastructure/todo-list/repositories/task/typeorm'
import { CommonRepositoryTypeORM } from '@/infrastructure/common/repositories'
import { getRepository } from 'typeorm'
import { TaskState } from '@/domain/todo-list'

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
      ...params
    }
    if (updatedEntity.state === TaskState.concluded) {
      updatedEntity.change_to_pending = updatedEntity.change_to_pending + 1
    }
    await this.repositoryTypeORM.save<any>(updatedEntity)
    return updatedEntity
  }
}
