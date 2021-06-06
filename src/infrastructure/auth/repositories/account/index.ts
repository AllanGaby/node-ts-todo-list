import { RepositoryType, CommonRepositoryType } from '@/infrastructure/common/repositories'
import {
  GetUserAccountByEmailRepository
} from '@/data/auth/repositories'
import { AccountRepositoryMemory } from './memory'
import { AccountRepositoryTypeORM } from './typeorm'
import { AccountModel } from '@/domain/auth'

export type AccountRepositoryType =
CommonRepositoryType<AccountModel> |
GetUserAccountByEmailRepository

export const getAccountRepository = (repositoryType: RepositoryType): AccountRepositoryType => {
  switch (repositoryType) {
    case RepositoryType.Memory:
      return AccountRepositoryMemory.getRepository()
    case RepositoryType.TypeOrm:
      return new AccountRepositoryTypeORM()
  }
}
