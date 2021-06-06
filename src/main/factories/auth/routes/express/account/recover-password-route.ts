import { routeAdapter, middlewareAdapter } from '@/main/common/adapters/express'
import { makeRecoverPasswordController, RecoverPasswordControllerProps } from '@/main/factories/auth/controllers'
import { Router } from 'express'
import { makeEncryptedRequestMiddleware } from '@/main/factories/auth/middlewares'

export type RecoverPasswordRouteProps = RecoverPasswordControllerProps

export const makeRecoverPasswordRoute = (props: RecoverPasswordRouteProps): Router => {
  return Router().patch('/recover-password',
    middlewareAdapter(makeEncryptedRequestMiddleware(props.privateKey)),
    routeAdapter(makeRecoverPasswordController(props)))
}
