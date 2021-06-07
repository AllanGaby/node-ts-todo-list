import { DbGetEntityByIdUseCase } from '@/data/common/use-cases'
import { GetEntityByIdRepository } from '@/data/common/repositories'
import { TaskModel, GetTaskByIdUseCase } from '@/domain/todo-list'
import { RepositoryType } from '@/infrastructure/common/repositories'
import { TaskRepositoryFactory } from '@/infrastructure/todo-list/repositories'

export type GetTaskByIdUseCaseProps = {
  repositoryType: RepositoryType
}

export const makeGetTaskByIdUseCase = ({ repositoryType }: GetTaskByIdUseCaseProps): GetTaskByIdUseCase => {
  return new DbGetEntityByIdUseCase<TaskModel>(
    TaskRepositoryFactory.GetTaskRepository<GetEntityByIdRepository<TaskModel>>(repositoryType),
    'Task'
  )
}
