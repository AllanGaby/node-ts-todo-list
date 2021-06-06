import { CreateAccessTokenUseCase, AccessTokenPayloadModel, AccessTokenModel } from '@/domain/auth'
import { EncryptWithSecret } from '@/data/auth/protocols'

export class MemoryCreateAccessTokenUseCase implements CreateAccessTokenUseCase {
  constructor (
    private readonly accessTokenValidityInMinutes: number,
    private readonly refreshTokenValidityInMinutes: number,
    private readonly encryptWithSecret: EncryptWithSecret
  ) {}

  async create (params: AccessTokenPayloadModel): Promise<AccessTokenModel> {
    const accessToken = await this.encryptWithSecret.encrypt({
      payload: params,
      subject: params.accountId
    }, `${this.accessTokenValidityInMinutes}m`)
    const refreshToken = await this.encryptWithSecret.encrypt({
      payload: params,
      subject: params.accountId
    }, `${this.refreshTokenValidityInMinutes}m`)
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      account_type: params.accountType,
      name: params.name,
      email: params.email
    }
  }
}
