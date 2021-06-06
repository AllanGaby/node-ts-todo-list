import { makeLoginRoute, LoginRouteProps } from './login-route'
import { makeLogoutRoute, LogoutRouteProps } from './logout-route'
import { makeRefreshAccessTokenRoute, RefreshAccessTokenRouteProps } from './refresh-access-token-route'
import { Router } from 'express'

export type SessionRouteProps = LoginRouteProps & LogoutRouteProps & RefreshAccessTokenRouteProps

export const makeSessionRoute = (props: SessionRouteProps): Router => {
  return Router()
    .use('/session', makeLoginRoute(props))
    .use('/session', makeLogoutRoute(props))
    .use('/session', makeRefreshAccessTokenRoute(props))
}
