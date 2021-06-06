import { Controller, exportFile, HttpRequest, HttpResponse, noContent, notFound, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { AccountModel } from '@/domain/auth'
import { RequestValidator } from '@/validation/validations'
import { EntityIsNotFoundError } from '@/data/common/errors'
import { UserAccountIdParamsRequest } from '@/presentation/auth/requests'
import { GetEntityByIdUseCase } from '@/domain/common'

type ShowUserAccountvatarResponse = Error | object

export class ShowUserAccountvatarController implements Controller<any, ShowUserAccountvatarResponse, any, any, UserAccountIdParamsRequest> {
  constructor (
    private readonly paramsRequestValidator: RequestValidator,
    private readonly getAccountIdUseCase: GetEntityByIdUseCase<AccountModel>
  ) {}

  async handle (request: HttpRequest<any, any, any, UserAccountIdParamsRequest>): Promise<HttpResponse<ShowUserAccountvatarResponse>> {
    const paramErrors = this.paramsRequestValidator.validate(request.params)
    if (paramErrors) {
      return unprocessableEntity(paramErrors)
    }

    try {
      const account = await this.getAccountIdUseCase.getById(request.params.account_id)
      if (account.avatar_path) {
        return exportFile(account.avatar_path)
      }
      return noContent()
    } catch (error) {
      if (error instanceof EntityIsNotFoundError) {
        return notFound()
      }
      return serverError(error)
    }
  }
}
