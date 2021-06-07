import { DeleteEntityController } from '@/presentation/common/controllers'
import { TaskModel } from '@/domain/todo-list'
import { DeleteTaskByIdUseCaseProps, makeDeleteTaskByIdUseCase } from '@/main/factories/todo-list/use-cases'
import { makeDefaultIdParamRequestValidator } from '@/main/factories/common/request-validator'

export type DeleteTaskByIdControllerProps = DeleteTaskByIdUseCaseProps

export const makeDeleteTaskByIdController = (props: DeleteTaskByIdControllerProps): DeleteEntityController<TaskModel> => {
  return new DeleteEntityController<TaskModel>(
    makeDefaultIdParamRequestValidator(),
    makeDeleteTaskByIdUseCase(props),
    'id'
  )
}
