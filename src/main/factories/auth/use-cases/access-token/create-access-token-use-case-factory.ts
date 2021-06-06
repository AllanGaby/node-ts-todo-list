import { CreateAccessTokenUseCase } from '@/domain/auth'
import { MemoryCreateAccessTokenUseCase } from '@/data/auth/use-cases'
import { CriptographyFactory } from '@/infrastructure/auth/criptography'

export type CreateAccessTokenUseCaseProps = {
  privateKey: string
  accessTokenValidityInMinutes: number
  refreshTokenValidityInMinutes: number
}

export const makeCreateAccessTokenUseCase = ({ accessTokenValidityInMinutes, refreshTokenValidityInMinutes, privateKey }: CreateAccessTokenUseCaseProps): CreateAccessTokenUseCase => {
  return new MemoryCreateAccessTokenUseCase(
    accessTokenValidityInMinutes,
    refreshTokenValidityInMinutes,
    CriptographyFactory.makeEncryptWithSecret(privateKey))
}
