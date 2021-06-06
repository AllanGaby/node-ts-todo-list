import { routeAdapter, middlewareAdapter } from '@/main/common/adapters/express'
import { makeAuthenticatedRequestMiddleware, AuthenticatedRequestMiddlewareProps, makeEncryptedRequestMiddleware } from '@/main/factories/auth/middlewares'
import { UpdateAuthenticatedUserAccountControllerProps, makeUpdateAuthenticatedUserAccountController } from '@/main/factories/auth/controllers'
import { Router } from 'express'

export type UpdateUserAccountRouteProps = AuthenticatedRequestMiddlewareProps & UpdateAuthenticatedUserAccountControllerProps & {
  privateKey: string
}

export const makeUpdateUserAccountRoute = (props: UpdateUserAccountRouteProps): Router => {
  return Router()
    .put('/',
      middlewareAdapter(makeEncryptedRequestMiddleware(props.privateKey)),
      middlewareAdapter(makeAuthenticatedRequestMiddleware(props)),
      routeAdapter(makeUpdateAuthenticatedUserAccountController(props)))
}
