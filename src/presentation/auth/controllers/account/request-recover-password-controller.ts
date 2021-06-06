import { Controller, HttpRequest, HttpResponse, noContent, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { RequestRecoverPasswordUseCase } from '@/domain/auth'
import { RequestValidator } from '@/validation/validations'
import { RequestRecoverPasswordRequest } from '@/presentation/auth/requests'

export type RequestRecoverPasswordResponse = undefined | Error | object

export class RequestRecoverPasswordController implements Controller<RequestRecoverPasswordRequest, RequestRecoverPasswordResponse> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly requestRecoverPasswordUseCase: RequestRecoverPasswordUseCase
  ) {}

  async handle (request: HttpRequest<RequestRecoverPasswordRequest>): Promise<HttpResponse<RequestRecoverPasswordResponse>> {
    const errors = this.validator.validate(request.body)
    if (errors) {
      return unprocessableEntity(errors)
    }
    try {
      this.requestRecoverPasswordUseCase.request(request.body.email)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
