import { ShowEntityController } from '@/presentation/common/controllers'
import { TaskModel } from '@/domain/todo-list'
import { GetTaskByIdUseCaseProps, makeGetTaskByIdUseCase } from '@/main/factories/todo-list/use-cases'
import { makeDefaultIdParamRequestValidator } from '@/main/factories/common/request-validator'

export type GetTaskByIdControllerProps = GetTaskByIdUseCaseProps

export const makeGetTaskByIdController = (props: GetTaskByIdControllerProps): ShowEntityController<TaskModel> => {
  return new ShowEntityController<TaskModel>(
    makeDefaultIdParamRequestValidator(),
    makeGetTaskByIdUseCase(props),
    'id'
  )
}
