import { LoginUseCase } from '@/domain/auth'
import { DbLoginUseCase } from '@/data/auth/use-cases'
import { RepositoryType } from '@/infrastructure/common/repositories'
import { AuthRepositoryFactory } from '@/infrastructure/auth/repositories'
import { CriptographyFactory } from '@/infrastructure/auth/criptography'
import { makeCreateAccessTokenUseCase, CreateAccessTokenUseCaseProps, makeCreateSessionUseCase } from '@/main/factories/auth/use-cases'
import { CacheFactory, CacheProps } from '@/infrastructure/common/cache'
import { GetUserAccountByEmailRepository } from '@/data/auth/repositories'

export type LoginUseCaseProps = CreateAccessTokenUseCaseProps & {
  salt: number
  repositoryType: RepositoryType
  cacheProps: CacheProps
}

export const makeLoginUseCase = ({ repositoryType, salt, accessTokenValidityInMinutes, refreshTokenValidityInMinutes, privateKey, cacheProps }: LoginUseCaseProps): LoginUseCase => {
  return new DbLoginUseCase(
    AuthRepositoryFactory.GetAccountRepository<GetUserAccountByEmailRepository>(repositoryType),
    CriptographyFactory.makeCompareHash(salt),
    makeCreateSessionUseCase(repositoryType),
    CacheFactory.makeCreateCache(cacheProps),
    makeCreateAccessTokenUseCase({
      accessTokenValidityInMinutes,
      refreshTokenValidityInMinutes,
      privateKey
    })
  )
}
