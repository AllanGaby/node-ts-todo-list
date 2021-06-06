import { UploadUserAccountAvatarRouteProps, makeUploadUserAccountAvatarRoute } from './upload-user-account-avatar-route'
import { ShowUserAccountAvatarRouteProps, makeShowUserAccountAvatarRoute } from './show-user-account-avatar-route'
import { DeleteUserAccountAvatarRouteProps, makeDeleteUserAccountAvatarRoute } from './delete-user-account-avatar-route'
import { Router } from 'express'

export type AccountAvatarRouteProps = UploadUserAccountAvatarRouteProps & ShowUserAccountAvatarRouteProps & DeleteUserAccountAvatarRouteProps

export const makeAccountAvatarRoute = (props: AccountAvatarRouteProps): Router => {
  return Router()
    .use('/', makeUploadUserAccountAvatarRoute(props))
    .use('/', makeShowUserAccountAvatarRoute(props))
    .use('/', makeDeleteUserAccountAvatarRoute(props))
}
