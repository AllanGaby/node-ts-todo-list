import { UpdateEntityController } from '@/presentation/common/controllers'
import { TaskModel } from '@/domain/todo-list'
import { UpdateTaskUseCaseProps, makeUpdateTaskUseCase } from '@/main/factories/todo-list/use-cases'
import { makeUpdateTaskRequestValidator } from '@/main/factories/todo-list/request-validator'

export type UpdateTaskControllerProps = UpdateTaskUseCaseProps

export const makeUpdateTaskController = (props: UpdateTaskControllerProps): UpdateEntityController<TaskModel> => {
  return new UpdateEntityController<TaskModel>(
    makeUpdateTaskRequestValidator(),
    makeUpdateTaskUseCase(props),
    'id'
  )
}
