import { ShowUserAccountvatarController } from '@/presentation/auth/controllers'
import { makeUserAccountIdParamsRequestValidator } from '@/main/factories/auth/request-validators'
import { makeGetUserAccountByIdUseCase, GetUserAccountByIdUseCaseProps } from '@/main/factories/auth/use-cases'

export type ShowUserAccountAvatarControllerProps = GetUserAccountByIdUseCaseProps

export const makeShowUserAccountAvatarController = (props: ShowUserAccountAvatarControllerProps): ShowUserAccountvatarController => {
  return new ShowUserAccountvatarController(
    makeUserAccountIdParamsRequestValidator(),
    makeGetUserAccountByIdUseCase(props)
  )
}
