import { AccountModel, UpdateUserAccountUseCase } from '@/domain/auth'
import { conflict, Controller, HttpRequest, HttpResponse, ok, serverError, unauthorized, unprocessableEntity } from '@/presentation/common/protocols'
import { RequestValidator } from '@/validation/validations'
import { UpdateUserAccountRequest } from '@/presentation/auth/requests'
import { EmailInUseError, InvalidCredentialsError } from '@/data/auth/errors'

type UpdateAuthenticatedUserAccountResponse = AccountModel | Error | object

export class UpdateAuthenticatedUserAccountController implements Controller<UpdateUserAccountRequest, UpdateAuthenticatedUserAccountResponse> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly updateUserAccountUseCase: UpdateUserAccountUseCase
  ) {}

  async handle (request: HttpRequest<UpdateUserAccountRequest>): Promise<HttpResponse<UpdateAuthenticatedUserAccountResponse>> {
    const errors = this.validator.validate(request.body)
    if (errors) {
      return unprocessableEntity(errors)
    }
    try {
      const account = await this.updateUserAccountUseCase.update(request.body.access_token.accountId, {
        name: request.body.name,
        email: request.body.email,
        old_password: request.body.old_password,
        new_password: request.body.new_password
      })
      return ok(account)
    } catch (error) {
      if (error instanceof EmailInUseError) {
        return conflict(error)
      }
      if (error instanceof InvalidCredentialsError) {
        return unauthorized(error)
      }
      return serverError(error)
    }
  }
}
