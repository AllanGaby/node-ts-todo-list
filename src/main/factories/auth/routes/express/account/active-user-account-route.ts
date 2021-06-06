import { routeAdapter } from '@/main/common/adapters/express'
import { makeActiveUserAccountController, ActiveUserAccountControllerProps } from '@/main/factories/auth/controllers'
import { Router } from 'express'

export type ActiveUserAccountRouteProps = ActiveUserAccountControllerProps

export const makeActiveUserAccountRoute = (props: ActiveUserAccountRouteProps): Router => {
  return Router().get('/active/:account_id',
    routeAdapter(makeActiveUserAccountController(props)))
}
