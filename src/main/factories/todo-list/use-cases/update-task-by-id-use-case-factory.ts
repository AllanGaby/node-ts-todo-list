import { DbUpdateEntityUseCase } from '@/data/common/use-cases'
import { UpdateEntityRepository } from '@/data/common/repositories'
import { TaskModel, UpdateTaskUseCase } from '@/domain/todo-list'
import { RepositoryType } from '@/infrastructure/common/repositories'
import { TaskRepositoryFactory } from '@/infrastructure/todo-list/repositories'

export type UpdateTaskUseCaseProps = {
  repositoryType: RepositoryType
}

export const makeUpdateTaskUseCase = ({ repositoryType }: UpdateTaskUseCaseProps): UpdateTaskUseCase => {
  return new DbUpdateEntityUseCase<TaskModel>(
    TaskRepositoryFactory.GetTaskRepository<UpdateEntityRepository<TaskModel>>(repositoryType)
  )
}
