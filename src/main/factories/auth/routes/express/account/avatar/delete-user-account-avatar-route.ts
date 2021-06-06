import { middlewareAdapter, routeAdapter } from '@/main/common/adapters/express'
import { makeAuthenticatedRequestMiddleware, AuthenticatedRequestMiddlewareProps } from '@/main/factories/auth/middlewares'
import { DeleteUserAccountAvatarControllerProps, makeDeleteUserAccountAvatarController } from '@/main/factories/auth/controllers'
import { Router } from 'express'

export type DeleteUserAccountAvatarRouteProps = AuthenticatedRequestMiddlewareProps & DeleteUserAccountAvatarControllerProps

export const makeDeleteUserAccountAvatarRoute = (props: DeleteUserAccountAvatarRouteProps): Router => {
  return Router()
    .delete('/:account_id/avatar',
      middlewareAdapter(makeAuthenticatedRequestMiddleware(props)),
      routeAdapter(makeDeleteUserAccountAvatarController(props)))
}
