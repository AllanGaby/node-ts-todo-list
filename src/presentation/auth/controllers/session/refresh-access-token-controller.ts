import { Controller, HttpRequest, HttpResponse, ok, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { CreateAccessTokenUseCase } from '@/domain/auth'
import { RequestValidator } from '@/validation/validations'
import { AuthenticatedRequest } from '@/presentation/auth/requests'

type RefreshAccessTokenResponse = undefined | Error | object

export class RefreshAccessTokenController implements Controller<AuthenticatedRequest, RefreshAccessTokenResponse> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly createAccessTokenUseCase: CreateAccessTokenUseCase
  ) {}

  async handle (request: HttpRequest<AuthenticatedRequest>): Promise<HttpResponse<RefreshAccessTokenResponse>> {
    const errors = this.validator.validate(request.body.access_token)
    if (errors) {
      return unprocessableEntity(errors)
    }
    try {
      const accessToken = await this.createAccessTokenUseCase.create(request.body.access_token)
      return ok(accessToken)
    } catch (error) {
      return serverError(error)
    }
  }
}
