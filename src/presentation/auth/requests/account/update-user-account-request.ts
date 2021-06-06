import { AuthenticatedRequest } from '@/presentation/auth/requests'

export type UpdateUserAccountRequest = AuthenticatedRequest & {
  name: string
  email?: string
  old_password?: string
  new_password?: string
  new_password_confirmation?: string
}
