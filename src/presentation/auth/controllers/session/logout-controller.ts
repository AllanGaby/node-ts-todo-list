import { Controller, HttpRequest, HttpResponse, noContent, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { LogoutUseCase } from '@/domain/auth'
import { RequestValidator } from '@/validation/validations'
import { AuthenticatedRequest } from '@/presentation/auth/requests'

type LogoutResponse = undefined | Error | object

export class LogoutController implements Controller<AuthenticatedRequest, LogoutResponse> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly logoutUseCase: LogoutUseCase
  ) {}

  async handle (request: HttpRequest<AuthenticatedRequest>): Promise<HttpResponse<LogoutResponse>> {
    const errors = this.validator.validate(request.body.access_token)
    if (errors) {
      return unprocessableEntity(errors)
    }
    try {
      await this.logoutUseCase.logout(request.body.access_token.sessionId)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
