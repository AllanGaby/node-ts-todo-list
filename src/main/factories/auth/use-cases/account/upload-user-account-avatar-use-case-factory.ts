import { AccountModel, UploadUserAccountAvatarUseCase } from '@/domain/auth'
import { DbUploadUserAccountAvatarUseCase } from '@/data/auth/use-cases'
import { RepositoryType } from '@/infrastructure/common/repositories'
import { StorageFactory, StorageConfig } from '@/infrastructure/common/storage'
import { AuthRepositoryFactory } from '@/infrastructure/auth/repositories'
import { GetEntityByIdRepository, UpdateEntityRepository } from '@/data/common/repositories'

export type UploadUserAccountAvatarUseCaseProps = {
  repositoryType: RepositoryType
  storageConfig: StorageConfig
}

export const makeUploadUserAccountAvatarUseCase = (props: UploadUserAccountAvatarUseCaseProps): UploadUserAccountAvatarUseCase => {
  return new DbUploadUserAccountAvatarUseCase(
    AuthRepositoryFactory.GetAccountRepository<GetEntityByIdRepository<AccountModel>>(props.repositoryType),
    StorageFactory.makeDeleteStorageFile(props.storageConfig),
    props.storageConfig.uploadDir,
    StorageFactory.makeUploadStorageFile(props.storageConfig),
    AuthRepositoryFactory.GetAccountRepository<UpdateEntityRepository<AccountModel>>(props.repositoryType)
  )
}
