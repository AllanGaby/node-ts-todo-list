import { AccessTokenPayloadModel } from '@/domain/auth'

export interface RecoverAccessTokenPayloadUseCase {
  recover: (token: string) => Promise<AccessTokenPayloadModel>
}
