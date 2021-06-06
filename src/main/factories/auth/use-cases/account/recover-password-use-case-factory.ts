import { AccountModel, RecoverPasswordUseCase } from '@/domain/auth'
import { DbRecoverPasswordUseCase } from '@/data/auth/use-cases'
import { CriptographyFactory } from '@/infrastructure/auth/criptography'
import { RepositoryType } from '@/infrastructure/common/repositories'
import { AuthRepositoryFactory } from '@/infrastructure/auth/repositories'
import { CacheFactory, CacheProps } from '@/infrastructure/common/cache'
import { GetEntityByIdRepository, UpdateEntityRepository } from '@/data/common/repositories'
import { DeleteSessionByAccountIdRepository } from '@/data/auth/repositories'

export type RecoverPasswordUseCaseProps = {
  privateKey: string
  repositoryType: RepositoryType
  salt: number
  cacheProps: CacheProps
}

export const makeRecoverPasswordUseCase = ({ privateKey, repositoryType, salt, cacheProps }: RecoverPasswordUseCaseProps): RecoverPasswordUseCase => {
  return new DbRecoverPasswordUseCase(
    CriptographyFactory.makeDecryptWithSecret(privateKey),
    AuthRepositoryFactory.GetAccountRepository<GetEntityByIdRepository<AccountModel>>(repositoryType),
    CriptographyFactory.makeCreateHash(salt),
    AuthRepositoryFactory.GetAccountRepository<UpdateEntityRepository<AccountModel>>(repositoryType),
    AuthRepositoryFactory.GetSessionRepository<DeleteSessionByAccountIdRepository>(repositoryType),
    CacheFactory.makeInvalidateCacheByPrefix(cacheProps)
  )
}
