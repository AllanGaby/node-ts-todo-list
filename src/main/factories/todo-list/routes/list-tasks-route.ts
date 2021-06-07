import { routeAdapter } from '@/main/common/adapters/express'
import { ListTasksControllerProps, makeListTasksController } from '@/main/factories/todo-list/controllers'
import { Router } from 'express'

export type ListTasksRouteProps = ListTasksControllerProps

export const makeListTasksRoute = (props: ListTasksRouteProps): Router => {
  return Router()
    .get('/list',
      routeAdapter(makeListTasksController(props)))
}
