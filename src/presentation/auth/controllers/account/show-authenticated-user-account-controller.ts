import { EntityIsNotFoundError } from '@/data/common/errors'
import { AccountModel } from '@/domain/auth'
import { GetEntityByIdUseCase } from '@/domain/common'
import { Controller, HttpRequest, HttpResponse, ok, serverError, unauthorized, unprocessableEntity } from '@/presentation/common/protocols'
import { RequestValidator } from '@/validation/validations'
import { AuthenticatedRequest } from '@/presentation/auth/requests'

type ShowAuthenticatedUserAccountResponse = AccountModel | Error | object

export class ShowAuthenticatedUserAccountController implements Controller<AuthenticatedRequest, ShowAuthenticatedUserAccountResponse> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly showUserAccountByAccountIdUseCase: GetEntityByIdUseCase<AccountModel>
  ) {}

  async handle (request: HttpRequest<AuthenticatedRequest>): Promise<HttpResponse<ShowAuthenticatedUserAccountResponse>> {
    const errors = this.validator.validate(request.body.access_token)
    if (errors) {
      return unprocessableEntity(errors)
    }
    try {
      const account = await this.showUserAccountByAccountIdUseCase.getById(request.body.access_token.accountId)
      return ok(account)
    } catch (error) {
      if (error instanceof EntityIsNotFoundError) {
        return unauthorized(error)
      }
      return serverError(error)
    }
  }
}
