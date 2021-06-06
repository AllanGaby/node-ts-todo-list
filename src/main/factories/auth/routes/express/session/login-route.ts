import { routeAdapter, middlewareAdapter } from '@/main/common/adapters/express'
import { makeEncryptedRequestMiddleware } from '@/main/factories/auth/middlewares'
import { makeLoginController, LoginControllerProps } from '@/main/factories/auth/controllers'
import { Router } from 'express'

export type LoginRouteProps = LoginControllerProps & {
  privateKey: string
}

export const makeLoginRoute = (props: LoginRouteProps): Router => {
  return Router()
    .post('/',
      middlewareAdapter(makeEncryptedRequestMiddleware(props.privateKey)),
      routeAdapter(makeLoginController(props)))
}
