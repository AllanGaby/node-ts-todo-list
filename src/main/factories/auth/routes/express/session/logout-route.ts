import { routeAdapter, middlewareAdapter } from '@/main/common/adapters/express'
import { makeAuthenticatedRequestMiddleware, AuthenticatedRequestMiddlewareProps } from '@/main/factories/auth/middlewares'
import { makeLogoutController, LogoutControllerProps } from '@/main/factories/auth/controllers'
import { Router } from 'express'

export type LogoutRouteProps = AuthenticatedRequestMiddlewareProps & LogoutControllerProps

export const makeLogoutRoute = (props: LogoutRouteProps): Router => {
  return Router()
    .delete('/',
      middlewareAdapter(makeAuthenticatedRequestMiddleware(props)),
      routeAdapter(makeLogoutController(props)))
}
