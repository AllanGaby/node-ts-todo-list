import { HttpRequest, HttpResponse, Middleware, ok, unprocessableEntity } from '@/presentation/common/protocols'
import { DecryptRequestWithPrivateKey } from '@/data/auth/protocols'
import { InvalidEncryptedTokenError } from '@/presentation/auth/errors'
import { RequestValidator } from '@/validation/validations'

export type EncryptedRequest = {
  token: string
}

type EncryptedResponse<DecryptedBodyType> = DecryptedBodyType | object

export class EncryptedRequestMiddleware<DecryptedBodyType = object> implements Middleware<EncryptedRequest, EncryptedResponse<DecryptedBodyType>> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly decryptRequestWithPrivateKey: DecryptRequestWithPrivateKey
  ) {}

  async handle (request: HttpRequest<EncryptedRequest>): Promise<HttpResponse<EncryptedResponse<DecryptedBodyType>>> {
    const errors = this.validator.validate(request.body)
    if (errors) {
      return unprocessableEntity(errors)
    }
    const { token } = request.body
    try {
      const decriptedRequest = this.decryptRequestWithPrivateKey.decrypt(token)
      return ok(JSON.parse(decriptedRequest))
    } catch (error) {
      return unprocessableEntity(new InvalidEncryptedTokenError())
    }
  }
}
