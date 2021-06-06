import { DeleteUserAccountAvatarController } from '@/presentation/auth/controllers'
import { makeUserAccountIdParamsRequestValidator } from '@/main/factories/auth/request-validators'
import { makeDeleteUserAccountAvatarUseCase, DeleteUserAccountAvatarUseCaseProps } from '@/main/factories/auth/use-cases'

export type DeleteUserAccountAvatarControllerProps = DeleteUserAccountAvatarUseCaseProps

export const makeDeleteUserAccountAvatarController = (props: DeleteUserAccountAvatarControllerProps): DeleteUserAccountAvatarController => {
  return new DeleteUserAccountAvatarController(
    makeUserAccountIdParamsRequestValidator(),
    makeDeleteUserAccountAvatarUseCase(props)
  )
}
