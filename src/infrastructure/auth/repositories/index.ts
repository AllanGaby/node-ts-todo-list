import { RepositoryType } from '@/infrastructure/common/repositories'
import { getAccountRepository, AccountRepositoryType } from './account'
import { getSessionRepository, SessionRepositoryType } from './session'

export class AuthRepositoryFactory {
  public static GetAccountRepository<Type extends AccountRepositoryType> (repositoryType: RepositoryType): Type {
    return getAccountRepository(repositoryType) as Type
  }

  public static GetSessionRepository<Type extends SessionRepositoryType> (repositoryType: RepositoryType): Type {
    return getSessionRepository(repositoryType) as Type
  }
}
