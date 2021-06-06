import { routeAdapter } from '@/main/common/adapters/express'
import { ShowUserAccountAvatarControllerProps, makeShowUserAccountAvatarController } from '@/main/factories/auth/controllers'
import { Router } from 'express'

export type ShowUserAccountAvatarRouteProps = ShowUserAccountAvatarControllerProps

export const makeShowUserAccountAvatarRoute = (props: ShowUserAccountAvatarRouteProps): Router => {
  return Router()
    .get('/:account_id/avatar',
      routeAdapter(makeShowUserAccountAvatarController(props)))
}
