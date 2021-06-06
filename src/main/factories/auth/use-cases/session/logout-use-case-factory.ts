import { LogoutUseCase, SessionModel } from '@/domain/auth'
import { DbLogoutUseCase } from '@/data/auth/use-cases'
import { RepositoryType } from '@/infrastructure/common/repositories'
import { AuthRepositoryFactory } from '@/infrastructure/auth/repositories'
import { CacheFactory, CacheProps } from '@/infrastructure/common/cache'
import { DeleteEntityByIdRepository } from '@/data/common/repositories'

export type LogoutUseCaseProps = {
  repositoryType: RepositoryType
  cacheProps: CacheProps
}

export const makeLogoutUseCase = ({ repositoryType, cacheProps }: LogoutUseCaseProps): LogoutUseCase => {
  return new DbLogoutUseCase(
    CacheFactory.makeInvalidateCacheByKey(cacheProps),
    AuthRepositoryFactory.GetSessionRepository<DeleteEntityByIdRepository<SessionModel>>(repositoryType)
  )
}
