import { TaskModel } from '@/domain/todo-list'
import { RepositoryType, CommonRepositoryType } from '@/infrastructure/common/repositories'
import { TaskRepositoryMemory } from './memory'
import { TaskRepositoryTypeORM } from './typeorm/repositories'

export type TaskRepositoryType =
CommonRepositoryType<TaskModel>

export const getTaskRepository = (repositoryType: RepositoryType): TaskRepositoryType => {
  switch (repositoryType) {
    case RepositoryType.Memory:
      return TaskRepositoryMemory.getRepository()
    case RepositoryType.TypeOrm:
      return new TaskRepositoryTypeORM()
  }
}

export class TaskRepositoryFactory {
  public static getRepository<Type extends TaskRepositoryType>(repositoryType: RepositoryType): Type {
    return getTaskRepository(repositoryType) as Type
  }
}
