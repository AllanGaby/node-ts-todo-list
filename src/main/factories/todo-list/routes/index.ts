import { ListTasksRouteProps, makeListTasksRoute } from './list-tasks-route'
import { Router } from 'express'

export type TasksGenericRouteProps =
ListTasksRouteProps

export const makeTasksGenericRoute = (props: TasksGenericRouteProps): Router => {
  return Router()
    .use('/todo', makeListTasksRoute(props))
}
