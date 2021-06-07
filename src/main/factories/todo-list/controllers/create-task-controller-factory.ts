import { CreateEntityController } from '@/presentation/common/controllers'
import { TaskModel } from '@/domain/todo-list'
import { makeCreateTaskRequestValidator } from '@/main/factories/todo-list/request-validator'
import { CreateTaskUseCaseProps, makeCreateTaskUseCase } from '@/main/factories/todo-list/use-cases'

export type CreateEntityControllerProps = CreateTaskUseCaseProps

export const makeCreateEntityController = (props: CreateEntityControllerProps): CreateEntityController<TaskModel> => {
  return new CreateEntityController<TaskModel>(
    makeCreateTaskRequestValidator(),
    makeCreateTaskUseCase(props)
  )
}
