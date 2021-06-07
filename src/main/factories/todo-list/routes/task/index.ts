import { ListTasksRouteProps, makeListTasksRoute } from './list-tasks-route'
import { CreateTaskRouteProps, makeCreateTaskRoute } from './create-task-route'
import { Router } from 'express'

export type TasksRouteProps =
ListTasksRouteProps &
CreateTaskRouteProps

export const makeTasksRoute = (props: TasksRouteProps): Router => {
  return Router()
    .use('/task', makeListTasksRoute(props))
    .use('/task', makeCreateTaskRoute(props))
}
