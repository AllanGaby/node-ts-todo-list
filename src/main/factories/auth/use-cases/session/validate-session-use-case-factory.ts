import { SessionModel, ValidateSessionByIdUseCase } from '@/domain/auth'
import { DbValidateSessionByIdUseCase } from '@/data/auth/use-cases'
import { RepositoryType } from '@/infrastructure/common/repositories'
import { AuthRepositoryFactory } from '@/infrastructure/auth/repositories'
import { CacheFactory, CacheProps } from '@/infrastructure/common/cache'
import { GetEntityByIdRepository } from '@/data/common/repositories'

export type ValidateSessionByIdUseCaseProps = {
  repositoryType: RepositoryType
  cacheProps: CacheProps
}

export const makeValidateSessionByIdUseCase = ({ repositoryType, cacheProps }: ValidateSessionByIdUseCaseProps): ValidateSessionByIdUseCase => {
  return new DbValidateSessionByIdUseCase(
    CacheFactory.makeRecoverCacheByKey(cacheProps),
    AuthRepositoryFactory.GetSessionRepository<GetEntityByIdRepository<SessionModel>>(repositoryType)
  )
}
