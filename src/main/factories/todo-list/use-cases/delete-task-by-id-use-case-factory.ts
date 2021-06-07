import { DbDeleteEntityByIdUseCase } from '@/data/common/use-cases'
import { DeleteEntityByIdRepository } from '@/data/common/repositories'
import { TaskModel, DeleteTaskByIdUseCase } from '@/domain/todo-list'
import { RepositoryType } from '@/infrastructure/common/repositories'
import { TaskRepositoryFactory } from '@/infrastructure/todo-list/repositories'

export type DeleteTaskByIdUseCaseProps = {
  repositoryType: RepositoryType
}

export const makeDeleteTaskByIdUseCase = ({ repositoryType }: DeleteTaskByIdUseCaseProps): DeleteTaskByIdUseCase => {
  return new DbDeleteEntityByIdUseCase<TaskModel>(
    TaskRepositoryFactory.GetTaskRepository<DeleteEntityByIdRepository<TaskModel>>(repositoryType)
  )
}
