import { CreateSessionUseCase, SessionModel } from '@/domain/auth'
import { DbCreateEntityUseCase } from '@/data/common/use-cases'
import { AuthRepositoryFactory } from '@/infrastructure/auth/repositories'
import { RepositoryType } from '@/infrastructure/common/repositories'
import { CreateEntityRepository } from '@/data/common/repositories'

export const makeCreateSessionUseCase = (repositoryType: RepositoryType): CreateSessionUseCase => {
  return new DbCreateEntityUseCase<SessionModel>(
    AuthRepositoryFactory.GetSessionRepository<CreateEntityRepository<SessionModel>>(repositoryType)
  )
}
