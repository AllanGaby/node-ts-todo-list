import { LoginController } from '@/presentation/auth/controllers'
import { makeLoginRequestValidator } from '@/main/factories/auth/request-validators'
import { makeLoginUseCase, LoginUseCaseProps } from '@/main/factories/auth/use-cases'

export type LoginControllerProps = LoginUseCaseProps

export const makeLoginController = (props: LoginControllerProps): LoginController => {
  return new LoginController(
    makeLoginRequestValidator(),
    makeLoginUseCase(props)
  )
}
