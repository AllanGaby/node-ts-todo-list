import { routeAdapter } from '@/main/common/adapters/express'
import { ChangeTaskToConcludedControllerProps, makeChangeTaskToConcludedController } from '@/main/factories/todo-list/controllers'
import { Router } from 'express'

export type ChangeTaskToConcludedRouteProps = ChangeTaskToConcludedControllerProps

export const makeChangeTaskToConcludedRoute = (props: ChangeTaskToConcludedRouteProps): Router => {
  return Router()
    .put('/:id/concluded',
      routeAdapter(makeChangeTaskToConcludedController(props)))
}
