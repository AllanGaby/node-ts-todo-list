import { LogoutController } from '@/presentation/auth/controllers'
import { makeLogoutRequestValidator } from '@/main/factories/auth/request-validators'
import { makeLogoutUseCase, LogoutUseCaseProps } from '@/main/factories/auth/use-cases'

export type LogoutControllerProps = LogoutUseCaseProps

export const makeLogoutController = (props: LogoutControllerProps): LogoutController => {
  return new LogoutController(
    makeLogoutRequestValidator(),
    makeLogoutUseCase(props))
}
