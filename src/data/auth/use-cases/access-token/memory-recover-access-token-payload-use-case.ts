import { AccessTokenPayloadModel, RecoverAccessTokenPayloadUseCase } from '@/domain/auth'
import { DecryptWithSecret } from '@/data/auth/protocols'
import { InvalidCredentialsError } from '@/data/auth/errors'

export class MemoryRecoverAccessTokenPayloadUseCase implements RecoverAccessTokenPayloadUseCase {
  constructor (
    private readonly decryptWithSecret: DecryptWithSecret
  ) {}

  async recover (token: string): Promise<AccessTokenPayloadModel> {
    try {
      const payload = await this.decryptWithSecret.decrypt(token)
      return payload.payload as AccessTokenPayloadModel
    } catch {
      throw new InvalidCredentialsError()
    }
  }
}
