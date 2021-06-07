import { RepositoryType } from '@/infrastructure/common/repositories'
import { getTaskRepository, TaskRepositoryType } from './task'

export class TaskRepositoryFactory {
  public static GetTaskRepository<Type extends TaskRepositoryType> (repositoryType: RepositoryType): Type {
    return getTaskRepository(repositoryType) as Type
  }
}
