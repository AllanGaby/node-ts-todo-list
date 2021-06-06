import { AccountModel, ActiveUserAccountUseCase } from '@/domain/auth'
import { DbActiveUserAccountUseCase } from '@/data/auth/use-cases'
import { AuthRepositoryFactory } from '@/infrastructure/auth/repositories'
import { RepositoryType } from '@/infrastructure/common/repositories'
import { GetEntityByIdRepository, UpdateEntityRepository } from '@/data/common/repositories'

export const makeActiveUserAccountUseCase = (repositoryType: RepositoryType): ActiveUserAccountUseCase => {
  return new DbActiveUserAccountUseCase(
    AuthRepositoryFactory.GetAccountRepository<GetEntityByIdRepository<AccountModel>>(repositoryType),
    AuthRepositoryFactory.GetAccountRepository<UpdateEntityRepository<AccountModel>>(repositoryType)
  )
}
