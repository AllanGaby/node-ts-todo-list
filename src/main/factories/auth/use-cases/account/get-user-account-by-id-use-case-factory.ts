import { GetEntityByIdUseCase } from '@/domain/common'
import { DbGetEntityByIdUseCase } from '@/data/common/use-cases'
import { RepositoryType } from '@/infrastructure/common/repositories'
import { AuthRepositoryFactory } from '@/infrastructure/auth/repositories'
import { AccountModel } from '@/domain/auth'
import { GetEntityByIdRepository } from '@/data/common/repositories'

export type GetUserAccountByIdUseCaseProps = {
  repositoryType: RepositoryType
}

export const makeGetUserAccountByIdUseCase = ({ repositoryType }: GetUserAccountByIdUseCaseProps): GetEntityByIdUseCase<AccountModel> => {
  return new DbGetEntityByIdUseCase<AccountModel>(
    AuthRepositoryFactory.GetAccountRepository<GetEntityByIdRepository<AccountModel>>(repositoryType),
    'Account'
  )
}
