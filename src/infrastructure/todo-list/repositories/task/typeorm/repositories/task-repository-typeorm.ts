import { TaskEntity } from '@/infrastructure/todo-list/repositories/task/typeorm'
import { CommonRepositoryTypeORM } from '@/infrastructure/common/repositories'
import { getRepository } from 'typeorm'

export class TaskRepositoryTypeORM extends CommonRepositoryTypeORM<TaskEntity> {
  constructor () {
    super()
    this.repositoryTypeORM = getRepository<TaskEntity>(TaskEntity)
  }
}
