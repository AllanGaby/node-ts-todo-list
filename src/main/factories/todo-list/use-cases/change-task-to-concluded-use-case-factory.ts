import { ChangeTaskToConcludedUseCase, TaskModel } from '@/domain/todo-list'
import { DbChangeTaskToConcludedUseCase } from '@/data/todo-list/use-cases'
import { GetEntityByIdRepository, UpdateEntityRepository } from '@/data/common/repositories'
import { RepositoryType } from '@/infrastructure/common/repositories'
import { TaskRepositoryFactory } from '@/infrastructure/todo-list/repositories'

export type ChangeTaskToConcludedUseCaseProps = {
  repositoryType: RepositoryType
}

export const makeChangeTaskToConcludedUseCase = ({ repositoryType }: ChangeTaskToConcludedUseCaseProps): ChangeTaskToConcludedUseCase => {
  return new DbChangeTaskToConcludedUseCase(
    TaskRepositoryFactory.GetTaskRepository<GetEntityByIdRepository<TaskModel>>(repositoryType),
    TaskRepositoryFactory.GetTaskRepository<UpdateEntityRepository<TaskModel>>(repositoryType)
  )
}
