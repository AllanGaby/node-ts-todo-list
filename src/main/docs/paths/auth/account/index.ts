import { accountPath } from './account-path'
import { accountActivePath } from './account-active-path'
import { accountRecoverPasswordPath } from './account-recover-password-path'
import { avatarPath } from './avatar-path'

export default {
  '/auth/account/{account_id}/avatar': avatarPath,
  '/auth/account': accountPath,
  '/auth/account/active/{account_id}': accountActivePath,
  '/auth/account/recover-password': accountRecoverPasswordPath
}
