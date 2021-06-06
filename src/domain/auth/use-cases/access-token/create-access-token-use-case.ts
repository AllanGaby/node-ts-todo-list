import { AccessTokenModel, AccessTokenPayloadModel } from '@/domain/auth'

export interface CreateAccessTokenUseCase {
  create: (params: AccessTokenPayloadModel) => Promise<AccessTokenModel>
}
