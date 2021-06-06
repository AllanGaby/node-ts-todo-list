import { InvalidCredentialsError } from '@/data/auth/errors'
import { RecoverPasswordUseCase } from '@/domain/auth'
import { RecoverPasswordRequest } from '@/presentation/auth/requests'
import { Controller, HttpRequest, HttpResponse, noContent, serverError, unauthorized, unprocessableEntity } from '@/presentation/common/protocols'
import { RequestValidator } from '@/validation/validations'

type RecoverPasswordResponse = undefined | Error | object

export class RecoverPasswordController implements Controller<RecoverPasswordRequest, RecoverPasswordResponse> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly recoverPasswordUseCase: RecoverPasswordUseCase
  ) {}

  async handle (request: HttpRequest<RecoverPasswordRequest>): Promise<HttpResponse<RecoverPasswordResponse>> {
    const errors = this.validator.validate(request.body)
    if (errors) {
      return unprocessableEntity(errors)
    }
    try {
      this.recoverPasswordUseCase.recoverPassword({
        token: request.body.token,
        password: request.body.password
      })
      return noContent()
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return unauthorized(error)
      }
      return serverError(error)
    }
  }
}
