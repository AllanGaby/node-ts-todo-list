import { Controller, HttpRequest, HttpResponse, noContent, notFound, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { UploadUserAccountAvatarUseCase } from '@/domain/auth'
import { RequestValidator } from '@/validation/validations'
import { UserAccountIdParamsRequest, UploadUserAccountAvatarRequest } from '@/presentation/auth/requests'
import { AccountIsNotFoundError } from '@/data/auth/errors'

type UploadUserAccountAvatarResponse = undefined | Error | object

export class UploadUserAccountAvatarController implements Controller<UploadUserAccountAvatarRequest, UploadUserAccountAvatarResponse, any, any, UserAccountIdParamsRequest> {
  constructor (
    private readonly paramsRequestValidator: RequestValidator,
    private readonly bodyRequestValidator: RequestValidator,
    private readonly uploadUserAccountAvatarUseCase: UploadUserAccountAvatarUseCase
  ) {}

  async handle (request: HttpRequest<UploadUserAccountAvatarRequest, any, any, UserAccountIdParamsRequest>): Promise<HttpResponse<UploadUserAccountAvatarResponse>> {
    const paramErrors = this.paramsRequestValidator.validate(request.params)
    if (paramErrors) {
      return unprocessableEntity(paramErrors)
    }
    const bodyErrors = this.bodyRequestValidator.validate(request.body)
    if (bodyErrors) {
      return unprocessableEntity(bodyErrors)
    }
    try {
      await this.uploadUserAccountAvatarUseCase.upload({
        account_id: request.params.account_id,
        avatar_path: request.body.avatar_path
      })
      return noContent()
    } catch (error) {
      if (error instanceof AccountIsNotFoundError) {
        return notFound()
      }
      return serverError(error)
    }
  }
}
