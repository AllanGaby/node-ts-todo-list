import { routeAdapter, middlewareAdapter } from '@/main/common/adapters/express'
import { makeAuthenticatedRequestMiddleware, AuthenticatedRequestMiddlewareProps } from '@/main/factories/auth/middlewares'
import { makeRefreshAccessTokenController, RefreshAccessTokenControllerProps } from '@/main/factories/auth/controllers'
import { Router } from 'express'

export type RefreshAccessTokenRouteProps = AuthenticatedRequestMiddlewareProps & RefreshAccessTokenControllerProps

export const makeRefreshAccessTokenRoute = (props: RefreshAccessTokenRouteProps): Router => {
  return Router()
    .post('/refresh',
      middlewareAdapter(makeAuthenticatedRequestMiddleware(props)),
      routeAdapter(makeRefreshAccessTokenController(props)))
}
