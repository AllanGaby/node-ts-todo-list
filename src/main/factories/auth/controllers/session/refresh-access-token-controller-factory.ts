import { RefreshAccessTokenController } from '@/presentation/auth/controllers'
import { makeRefreshAccessTokenRequestValidator } from '@/main/factories/auth/request-validators'
import { makeCreateAccessTokenUseCase, CreateAccessTokenUseCaseProps } from '@/main/factories/auth/use-cases'

export type RefreshAccessTokenControllerProps = CreateAccessTokenUseCaseProps

export const makeRefreshAccessTokenController = (props: RefreshAccessTokenControllerProps): RefreshAccessTokenController => {
  return new RefreshAccessTokenController(
    makeRefreshAccessTokenRequestValidator(),
    makeCreateAccessTokenUseCase(props))
}
