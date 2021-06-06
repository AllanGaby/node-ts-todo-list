import { UpdateAuthenticatedUserAccountController } from '@/presentation/auth/controllers'
import { makeUpdateUserAccountRequestValidator } from '@/main/factories/auth/request-validators'
import { makeUpdateUserAccountUseCase, UpdateUserAccountUseCaseProps } from '@/main/factories/auth/use-cases'

export type UpdateAuthenticatedUserAccountControllerProps = UpdateUserAccountUseCaseProps

export const makeUpdateAuthenticatedUserAccountController = (props: UpdateAuthenticatedUserAccountControllerProps): UpdateAuthenticatedUserAccountController => {
  return new UpdateAuthenticatedUserAccountController(
    makeUpdateUserAccountRequestValidator(),
    makeUpdateUserAccountUseCase(props)
  )
}
