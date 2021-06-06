import { HttpRequest, HttpResponse, Middleware, ok, unauthorized, unprocessableEntity } from '@/presentation/common/protocols'
import { AccessTokenPayloadModel, RecoverAccessTokenPayloadUseCase, ValidateSessionByIdUseCase, AccountType } from '@/domain/auth'
import { RequestValidator } from '@/validation/validations'
import { InvalidCredentialsError, SessionNotFoundError } from '@/data/auth/errors'
import { AccessDeniedError } from '@/presentation/auth/errors'

export type AuthenticatedRequest = {
  [key: string]: string
}

export class AuthenticatedRequestMiddleware implements Middleware<AuthenticatedRequest, AccessTokenPayloadModel | object> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly recoverAccessTokenPayloadUseCase: RecoverAccessTokenPayloadUseCase,
    private readonly validateSessionByIdUseCase: ValidateSessionByIdUseCase,
    private readonly AccountTypesWithAccess: AccountType[],
    private readonly accessTokenName: string
  ) {}

  async handle (request: HttpRequest<AuthenticatedRequest>): Promise<HttpResponse<AccessTokenPayloadModel | object>> {
    try {
      const errors = this.validator.validate(request.headers)
      if (errors) {
        return unauthorized(new AccessDeniedError())
      }
      const token = request.headers[this.accessTokenName]
      const accessTokenPayload = await this.recoverAccessTokenPayloadUseCase.recover(token)
      const session = await this.validateSessionByIdUseCase.validate(accessTokenPayload.sessionId)
      if ((session) && ((this.AccountTypesWithAccess.length === 0) || (this.AccountTypesWithAccess.includes(accessTokenPayload.accountType)))) {
        return ok({
          access_token: accessTokenPayload,
          ...request.body
        })
      }
      return unauthorized(new AccessDeniedError())
    } catch (error) {
      if (error instanceof SessionNotFoundError) {
        return unauthorized(new AccessDeniedError())
      }
      return unprocessableEntity(new InvalidCredentialsError())
    }
  }
}
