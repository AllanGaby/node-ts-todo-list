import { TasksRouteProps, makeTasksRoute } from './task'
import { Router } from 'express'

export type TodoRouteProps =
TasksRouteProps

export const makeTodoRoute = (props: TodoRouteProps): Router => {
  return Router()
    .use('/todo', makeTasksRoute(props))
}
