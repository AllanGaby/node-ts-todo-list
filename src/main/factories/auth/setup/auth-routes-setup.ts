import { Router } from 'express'
import { makeAccountRoute, AccountRouteProps, makeSessionRoute, SessionRouteProps } from '@/main/factories/auth/routes/express'

export type AuthRouteProps = AccountRouteProps & SessionRouteProps

export const makeAuthRoutes = (props: AuthRouteProps): Router => {
  return Router()
    .use('/auth', makeAccountRoute(props))
    .use('/auth', makeSessionRoute(props))
}
