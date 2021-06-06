import { routeAdapter, middlewareAdapter } from '@/main/common/adapters/express'
import { makeAuthenticatedRequestMiddleware, AuthenticatedRequestMiddlewareProps } from '@/main/factories/auth/middlewares'
import { makeShowAuthenticatedUserAccountController, ShowAuthenticatedUserAccountControllerProps } from '@/main/factories/auth/controllers'
import { Router } from 'express'

export type ShowAuthenticatedUserAccountRouteProps = AuthenticatedRequestMiddlewareProps & ShowAuthenticatedUserAccountControllerProps

export const makeShowAuthenticatedUserAccountRoute = (props: ShowAuthenticatedUserAccountRouteProps): Router => {
  return Router()
    .get('/',
      middlewareAdapter(makeAuthenticatedRequestMiddleware(props)),
      routeAdapter(makeShowAuthenticatedUserAccountController(props)))
}
