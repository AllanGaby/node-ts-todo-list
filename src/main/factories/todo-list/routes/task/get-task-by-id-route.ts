import { routeAdapter } from '@/main/common/adapters/express'
import { GetTaskByIdControllerProps, makeGetTaskByIdController } from '@/main/factories/todo-list/controllers'
import { Router } from 'express'

export type GetTaskByIdRouteProps = GetTaskByIdControllerProps

export const makeGetTaskByIdRoute = (props: GetTaskByIdRouteProps): Router => {
  return Router()
    .get('/:id/show',
      routeAdapter(makeGetTaskByIdController(props)))
}
