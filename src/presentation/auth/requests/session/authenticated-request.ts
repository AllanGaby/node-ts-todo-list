import { AccessTokenPayloadModel } from '@/domain/auth'

export type AuthenticatedRequest = {
  access_token: AccessTokenPayloadModel
}
