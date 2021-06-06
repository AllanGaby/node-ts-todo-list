import { RecoverPasswordController } from '@/presentation/auth/controllers'
import { makeRecoverPasswordRequestValidator } from '@/main/factories/auth/request-validators'
import { RecoverPasswordUseCaseProps, makeRecoverPasswordUseCase } from '@/main/factories/auth/use-cases'

export type RecoverPasswordControllerProps = RecoverPasswordUseCaseProps

export const makeRecoverPasswordController = (props: RecoverPasswordControllerProps): RecoverPasswordController => {
  return new RecoverPasswordController(
    makeRecoverPasswordRequestValidator(),
    makeRecoverPasswordUseCase(props)
  )
}
