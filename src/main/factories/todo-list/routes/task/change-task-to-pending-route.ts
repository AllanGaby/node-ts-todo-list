import { routeAdapter } from '@/main/common/adapters/express'
import { ChangeTaskToPendingControllerProps, makeChangeTaskToPendingController } from '@/main/factories/todo-list/controllers'
import { Router } from 'express'

export type ChangeTaskToPendingRouteProps = ChangeTaskToPendingControllerProps

export const makeChangeTaskToPendingRoute = (props: ChangeTaskToPendingRouteProps): Router => {
  return Router()
    .put('/:id/pending',
      routeAdapter(makeChangeTaskToPendingController(props)))
}
