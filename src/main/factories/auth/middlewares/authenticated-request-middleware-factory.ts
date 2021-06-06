import { AuthenticatedRequestMiddleware } from '@/presentation/auth/middlewares'
import { makeRecoverAccessTokenPayloadUseCase, makeValidateSessionByIdUseCase } from '@/main/factories/auth/use-cases'
import { makeAuthenticatedRequestValidator } from '@/main/factories/auth/request-validators'
import { AccountType } from '@/domain/auth'
import { CacheProps } from '@/infrastructure/common/cache'
import { RepositoryType } from '@/infrastructure/common/repositories'

export type AuthenticatedRequestMiddlewareProps = {
  privateKey: string
  accessTokenName: string
  accountTypesWithAccess?: AccountType[]
  cacheProps: CacheProps
  repositoryType: RepositoryType
}

export const makeAuthenticatedRequestMiddleware = ({ privateKey, cacheProps, repositoryType, accessTokenName, accountTypesWithAccess = [] }: AuthenticatedRequestMiddlewareProps): AuthenticatedRequestMiddleware => {
  return new AuthenticatedRequestMiddleware(
    makeAuthenticatedRequestValidator(accessTokenName),
    makeRecoverAccessTokenPayloadUseCase(privateKey),
    makeValidateSessionByIdUseCase({
      cacheProps,
      repositoryType
    }),
    accountTypesWithAccess,
    accessTokenName)
}
