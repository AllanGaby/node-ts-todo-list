import { ChangeTaskToPendingUseCase, TaskModel } from '@/domain/todo-list'
import { DbChangeTaskToPendingUseCase } from '@/data/todo-list/use-cases'
import { GetEntityByIdRepository, UpdateEntityRepository } from '@/data/common/repositories'
import { RepositoryType } from '@/infrastructure/common/repositories'
import { TaskRepositoryFactory } from '@/infrastructure/todo-list/repositories'

export type ChangeTaskToPendingUseCaseProps = {
  repositoryType: RepositoryType
}

export const makeChangeTaskToPendingUseCase = ({ repositoryType }: ChangeTaskToPendingUseCaseProps): ChangeTaskToPendingUseCase => {
  return new DbChangeTaskToPendingUseCase(
    TaskRepositoryFactory.GetTaskRepository<GetEntityByIdRepository<TaskModel>>(repositoryType),
    TaskRepositoryFactory.GetTaskRepository<UpdateEntityRepository<TaskModel>>(repositoryType)
  )
}
