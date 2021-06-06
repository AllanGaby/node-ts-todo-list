import { AccountModel, DeleteUserAccountAvatarUseCase } from '@/domain/auth'
import { DbDeleteUserAccountAvatarUseCase } from '@/data/auth/use-cases'
import { AuthRepositoryFactory } from '@/infrastructure/auth/repositories'
import { RepositoryType } from '@/infrastructure/common/repositories'
import { StorageFactory, StorageConfig } from '@/infrastructure/common/storage'
import { GetEntityByIdRepository, UpdateEntityRepository } from '@/data/common/repositories'

export type DeleteUserAccountAvatarUseCaseProps = {
  repositoryType: RepositoryType
  storageConfig: StorageConfig
}

export const makeDeleteUserAccountAvatarUseCase = (props: DeleteUserAccountAvatarUseCaseProps): DeleteUserAccountAvatarUseCase => {
  return new DbDeleteUserAccountAvatarUseCase(
    AuthRepositoryFactory.GetAccountRepository<GetEntityByIdRepository<AccountModel>>(props.repositoryType),
    StorageFactory.makeDeleteStorageFile(props.storageConfig),
    AuthRepositoryFactory.GetAccountRepository<UpdateEntityRepository<AccountModel>>(props.repositoryType)
  )
}
