import { routeAdapter } from '@/main/common/adapters/express'
import { DeleteTaskByIdControllerProps, makeDeleteTaskByIdController } from '@/main/factories/todo-list/controllers'
import { Router } from 'express'

export type DeleteTaskByIdRouteProps = DeleteTaskByIdControllerProps

export const makeDeleteTaskByIdRoute = (props: DeleteTaskByIdRouteProps): Router => {
  return Router()
    .delete('/:id',
      routeAdapter(makeDeleteTaskByIdController(props)))
}
