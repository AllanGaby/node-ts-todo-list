import { ListTasksUseCase, TaskModel } from '@/domain/todo-list'
import { DbListEntitiesUseCase } from '@/data/common/use-cases'
import { ListEntitiesRepository } from '@/data/common/repositories'
import { RepositoryType } from '@/infrastructure/common/repositories'
import { TaskRepositoryFactory } from '@/infrastructure/todo-list/repositories'

export type ListTasksUseCaseProps = {
  repositoryType: RepositoryType
}

export const makeListTasksUseCase = ({ repositoryType }: ListTasksUseCaseProps): ListTasksUseCase => {
  return new DbListEntitiesUseCase<TaskModel>(
    TaskRepositoryFactory.GetTaskRepository<ListEntitiesRepository<TaskModel>>(repositoryType)
  )
}
