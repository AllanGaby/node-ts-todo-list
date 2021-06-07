import { ListEntitiesController } from '@/presentation/common/controllers'
import { TaskModel } from '@/domain/todo-list'
import { ListTasksUseCaseProps, makeListTasksUseCase } from '@/main/factories/todo-list/use-cases'

export type ListTasksControllerProps = ListTasksUseCaseProps

export const makeListTasksController = (props: ListTasksControllerProps): ListEntitiesController<TaskModel> => {
  return new ListEntitiesController<TaskModel>(
    makeListTasksUseCase(props)
  )
}
