import { Controller, created, HttpRequest, HttpResponse, serverError, unauthorized, unprocessableEntity } from '@/presentation/common/protocols'
import { AccessTokenModel, LoginUseCase } from '@/domain/auth'
import { RequestValidator } from '@/validation/validations'
import { InvalidCredentialsError, InvalidStatusAccountError } from '@/data/auth/errors'
import { LoginRequest } from '@/presentation/auth/requests'

type LoginResponse = AccessTokenModel | Error | object

export class LoginController implements Controller<LoginRequest, LoginResponse> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly loginUseCase: LoginUseCase
  ) {}

  async handle (request: HttpRequest<LoginRequest>): Promise<HttpResponse<LoginResponse>> {
    const errors = this.validator.validate(request.body)
    if (errors) {
      return unprocessableEntity(errors)
    }
    const { email, password } = request.body
    try {
      const accessToken = await this.loginUseCase.login({
        email,
        password
      })
      return created(accessToken)
    } catch (error) {
      if ((error instanceof InvalidCredentialsError) || (error instanceof InvalidStatusAccountError)) {
        return unauthorized(error)
      }
      return serverError(error)
    }
  }
}
