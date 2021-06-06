import { Router } from 'express'
import { CreateUserAccountAndSendMailRouteProps, makeCreateUserAccountAndSendMailRoute } from './create-user-account-and-send-mail-route'
import { ActiveUserAccountRouteProps, makeActiveUserAccountRoute } from './active-user-account-route'
import { RequestRecoverPasswordRouteProps, makeRequestRecoverPasswordRoute } from './request-recover-password-route'
import { RecoverPasswordRouteProps, makeRecoverPasswordRoute } from './recover-password-route'
import { ShowAuthenticatedUserAccountRouteProps, makeShowAuthenticatedUserAccountRoute } from './show-authenticated-user-account-route'
import { UpdateUserAccountRouteProps, makeUpdateUserAccountRoute } from './update-user-account-route'
import { AccountAvatarRouteProps, makeAccountAvatarRoute } from './avatar'

export type AccountRouteProps = CreateUserAccountAndSendMailRouteProps & ActiveUserAccountRouteProps & RequestRecoverPasswordRouteProps & RecoverPasswordRouteProps & ShowAuthenticatedUserAccountRouteProps & UpdateUserAccountRouteProps & AccountAvatarRouteProps

export const makeAccountRoute = (props: AccountRouteProps): Router => {
  return Router()
    .use('/account', makeCreateUserAccountAndSendMailRoute(props))
    .use('/account', makeActiveUserAccountRoute(props))
    .use('/account', makeRequestRecoverPasswordRoute(props))
    .use('/account', makeRecoverPasswordRoute(props))
    .use('/account', makeShowAuthenticatedUserAccountRoute(props))
    .use('/account', makeUpdateUserAccountRoute(props))
    .use('/account', makeAccountAvatarRoute(props))
}
