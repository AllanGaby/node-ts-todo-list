import { TaskModel, CreateTaskUseCase } from '@/domain/todo-list'
import { CreateEntityRepository } from '@/data/common/repositories'
import { DbCreateEntityUseCase } from '@/data/common/use-cases'
import { RepositoryType } from '@/infrastructure/common/repositories'
import { TaskRepositoryFactory } from '@/infrastructure/todo-list/repositories'

export type CreateTaskUseCaseProps = {
  repositoryType: RepositoryType
}

export const makeCreateTaskUseCase = ({ repositoryType }: CreateTaskUseCaseProps): CreateTaskUseCase => {
  return new DbCreateEntityUseCase<TaskModel>(
    TaskRepositoryFactory.GetTaskRepository<CreateEntityRepository<TaskModel>>(repositoryType)
  )
}
