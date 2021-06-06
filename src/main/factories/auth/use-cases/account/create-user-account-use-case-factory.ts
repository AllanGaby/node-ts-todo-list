import { AccountModel, AccountType, CreateUserAccountUseCase } from '@/domain/auth'
import { DbCreateUserAccountUseCase } from '@/data/auth/use-cases'
import { AuthRepositoryFactory } from '@/infrastructure/auth/repositories'
import { RepositoryType } from '@/infrastructure/common/repositories'
import { CriptographyFactory } from '@/infrastructure/auth/criptography'
import { GetUserAccountByEmailRepository } from '@/data/auth/repositories'
import { CreateEntityRepository } from '@/data/common/repositories'

export type CreateUserAccountUseCaseProps = {
  repositoryType: RepositoryType
  salt: number
  accountType: AccountType
}

export const makeCreateUserAccountUseCase = ({ repositoryType, salt, accountType = AccountType.standard }: CreateUserAccountUseCaseProps): CreateUserAccountUseCase => {
  return new DbCreateUserAccountUseCase(
    AuthRepositoryFactory.GetAccountRepository<GetUserAccountByEmailRepository>(repositoryType),
    CriptographyFactory.makeCreateHash(salt),
    AuthRepositoryFactory.GetAccountRepository<CreateEntityRepository<AccountModel>>(repositoryType),
    accountType
  )
}
