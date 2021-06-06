import { routeAdapter } from '@/main/common/adapters/express'
import { makeRequestRecoverPasswordController, RequestRecoverPasswordControllerProps } from '@/main/factories/auth/controllers'
import { Router } from 'express'

export type RequestRecoverPasswordRouteProps = RequestRecoverPasswordControllerProps

export const makeRequestRecoverPasswordRoute = (props: RequestRecoverPasswordRouteProps): Router => {
  return Router().post('/recover-password', routeAdapter(makeRequestRecoverPasswordController(props)))
}
