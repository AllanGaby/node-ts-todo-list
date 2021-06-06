import { middlewareAdapter, routeAdapter } from '@/main/common/adapters/express'
import { makeCreateUserAccountAndSendMailController, CreateUserAccountAndSendMailControllerProps } from '@/main/factories/auth/controllers'
import { makeEncryptedRequestMiddleware } from '@/main/factories/auth/middlewares'
import { Router } from 'express'

export type CreateUserAccountAndSendMailRouteProps = CreateUserAccountAndSendMailControllerProps & {
  privateKey: string
}

export const makeCreateUserAccountAndSendMailRoute = (props: CreateUserAccountAndSendMailRouteProps): Router => {
  return Router().post('/',
    middlewareAdapter(makeEncryptedRequestMiddleware(props.privateKey)),
    routeAdapter(makeCreateUserAccountAndSendMailController(props)))
}
