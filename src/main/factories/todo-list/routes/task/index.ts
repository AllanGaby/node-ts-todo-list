import { CreateTaskRouteProps, makeCreateTaskRoute } from './create-task-route'
import { DeleteTaskByIdRouteProps, makeDeleteTaskByIdRoute } from './delete-task-by-id-route'
import { GetTaskByIdRouteProps, makeGetTaskByIdRoute } from './get-task-by-id-route'
import { ListTasksRouteProps, makeListTasksRoute } from './list-tasks-route'
import { UpdateTaskRouteProps, makeUpdateTaskRoute } from './update-task-route'
import { Router } from 'express'

export type TasksRouteProps =
CreateTaskRouteProps &
DeleteTaskByIdRouteProps &
GetTaskByIdRouteProps &
ListTasksRouteProps &
UpdateTaskRouteProps

export const makeTasksRoute = (props: TasksRouteProps): Router => {
  return Router()
    .use('/task', makeCreateTaskRoute(props))
    .use('/task', makeDeleteTaskByIdRoute(props))
    .use('/task', makeGetTaskByIdRoute(props))
    .use('/task', makeListTasksRoute(props))
    .use('/task', makeUpdateTaskRoute(props))
}
