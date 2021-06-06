import { RequestRecoverPasswordController } from '@/presentation/auth/controllers'
import { makeRequestRecoverPasswordUseCase, RequestRecoverPasswordUseCaseProps } from '@/main/factories/auth/use-cases'
import { makeRequestRecoverPasswordRequestValidator } from '@/main/factories/auth/request-validators'

export type RequestRecoverPasswordControllerProps = RequestRecoverPasswordUseCaseProps

export const makeRequestRecoverPasswordController = (props: RequestRecoverPasswordControllerProps): RequestRecoverPasswordController => {
  return new RequestRecoverPasswordController(
    makeRequestRecoverPasswordRequestValidator(),
    makeRequestRecoverPasswordUseCase(props)
  )
}
