import { UploadUserAccountAvatarController } from '@/presentation/auth/controllers'
import { makeUploadUserAccountAvatarRequestValidator, makeUserAccountIdParamsRequestValidator } from '@/main/factories/auth/request-validators'
import { makeUploadUserAccountAvatarUseCase, UploadUserAccountAvatarUseCaseProps } from '@/main/factories/auth/use-cases'

export type UploadUserAccountAvatarControllerProps = UploadUserAccountAvatarUseCaseProps

export const makeUploadUserAccountAvatarController = (props: UploadUserAccountAvatarControllerProps): UploadUserAccountAvatarController => {
  return new UploadUserAccountAvatarController(
    makeUserAccountIdParamsRequestValidator(),
    makeUploadUserAccountAvatarRequestValidator(),
    makeUploadUserAccountAvatarUseCase(props)
  )
}
