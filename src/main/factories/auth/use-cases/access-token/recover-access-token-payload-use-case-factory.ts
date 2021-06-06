import { RecoverAccessTokenPayloadUseCase } from '@/domain/auth'
import { MemoryRecoverAccessTokenPayloadUseCase } from '@/data/auth/use-cases'
import { CriptographyFactory } from '@/infrastructure/auth/criptography'

export const makeRecoverAccessTokenPayloadUseCase = (privateKey: string): RecoverAccessTokenPayloadUseCase => {
  return new MemoryRecoverAccessTokenPayloadUseCase(CriptographyFactory.makeDecryptWithSecret(privateKey))
}
