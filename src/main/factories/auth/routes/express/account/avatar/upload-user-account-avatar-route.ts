import { middlewareAdapter, routeAdapter } from '@/main/common/adapters/express'
import { makeAuthenticatedRequestMiddleware, AuthenticatedRequestMiddlewareProps } from '@/main/factories/auth/middlewares'
import { UploadUserAccountAvatarControllerProps, makeUploadUserAccountAvatarController } from '@/main/factories/auth/controllers'
import { multerSetup } from '@/main/config/multer'
import { Router } from 'express'

export type UploadUserAccountAvatarRouteProps = AuthenticatedRequestMiddlewareProps & UploadUserAccountAvatarControllerProps

export const makeUploadUserAccountAvatarRoute = (props: UploadUserAccountAvatarRouteProps): Router => {
  return Router()
    .patch('/:account_id/avatar',
      middlewareAdapter(makeAuthenticatedRequestMiddleware(props)),
      multerSetup(props.storageConfig.temporaryDir).single('avatar_path'),
      routeAdapter(makeUploadUserAccountAvatarController(props), 'avatar_path'))
}
