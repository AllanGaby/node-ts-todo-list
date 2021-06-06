import { AccountIsNotFoundError } from '@/data/auth/errors'
import { ActiveUserAccountUseCase } from '@/domain/auth'
import { Controller, HttpRequest, HttpResponse, noContent, serverError, unauthorized, unprocessableEntity } from '@/presentation/common/protocols'
import { RequestValidator } from '@/validation/validations'
import { ActiveUserAccountRequest } from '@/presentation/auth/requests'

export type ActiveUserAccountResponse = any

export class ActiveUserAccountController implements Controller<ActiveUserAccountRequest, ActiveUserAccountResponse> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly activeUserAccountUseCase: ActiveUserAccountUseCase
  ) {}

  async handle (request: HttpRequest<any, any, ActiveUserAccountRequest>): Promise<HttpResponse<ActiveUserAccountResponse>> {
    const errors = this.validator.validate(request.params)
    if (errors) {
      return unprocessableEntity(errors)
    }
    try {
      await this.activeUserAccountUseCase.active(request.params.account_id)
      return noContent()
    } catch (error) {
      if (error instanceof AccountIsNotFoundError) {
        return unauthorized(error)
      }
      return serverError(error)
    }
  }
}
