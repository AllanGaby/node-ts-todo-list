import { Controller, HttpRequest, HttpResponse, noContent, notFound, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { DeleteUserAccountAvatarUseCase } from '@/domain/auth'
import { RequestValidator } from '@/validation/validations'
import { UserAccountIdParamsRequest } from '@/presentation/auth/requests'
import { AccountIsNotFoundError } from '@/data/auth/errors'

type DeleteUserAccountAvatarResponse = undefined | Error | object

export class DeleteUserAccountAvatarController implements Controller<any, DeleteUserAccountAvatarResponse, any, any, UserAccountIdParamsRequest> {
  constructor (
    private readonly paramsRequestValidator: RequestValidator,
    private readonly deleteUserAccountAvatarUseCase: DeleteUserAccountAvatarUseCase
  ) {}

  async handle (request: HttpRequest<any, any, any, UserAccountIdParamsRequest>): Promise<HttpResponse<DeleteUserAccountAvatarResponse>> {
    const paramErrors = this.paramsRequestValidator.validate(request.params)
    if (paramErrors) {
      return unprocessableEntity(paramErrors)
    }
    try {
      await this.deleteUserAccountAvatarUseCase.deleteAvatar(request.params.account_id)
      return noContent()
    } catch (error) {
      if (error instanceof AccountIsNotFoundError) {
        return notFound()
      }
      return serverError(error)
    }
  }
}
