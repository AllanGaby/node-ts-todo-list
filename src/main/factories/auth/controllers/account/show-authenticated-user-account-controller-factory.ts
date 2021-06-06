import { ShowAuthenticatedUserAccountController } from '@/presentation/auth/controllers'
import { makeShowAuthenticatedUserAccountRequestValidator } from '@/main/factories/auth/request-validators'
import { GetUserAccountByIdUseCaseProps, makeGetUserAccountByIdUseCase } from '@/main/factories/auth/use-cases'

export type ShowAuthenticatedUserAccountControllerProps = GetUserAccountByIdUseCaseProps

export const makeShowAuthenticatedUserAccountController = (props: ShowAuthenticatedUserAccountControllerProps): ShowAuthenticatedUserAccountController => {
  return new ShowAuthenticatedUserAccountController(
    makeShowAuthenticatedUserAccountRequestValidator(),
    makeGetUserAccountByIdUseCase(props)
  )
}
