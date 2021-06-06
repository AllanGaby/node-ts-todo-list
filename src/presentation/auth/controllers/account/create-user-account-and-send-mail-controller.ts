import { conflict, Controller, HttpRequest, HttpResponse, noContent, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { CreateUserAccountAndSendMailUseCase } from '@/domain/auth'
import { CreateUserAccountAndSendMailRequest } from '@/presentation/auth/requests'
import { RequestValidator } from '@/validation/validations'
import { EmailInUseError } from '@/data/auth/errors'

type CreateUserAccountAndSendMailResponse = undefined | Error | object

export class CreateUserAccountAndSendMailController implements Controller<CreateUserAccountAndSendMailRequest, CreateUserAccountAndSendMailResponse> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly createUserAccountAndSendMailUseCase: CreateUserAccountAndSendMailUseCase
  ) {}

  async handle (request: HttpRequest<CreateUserAccountAndSendMailRequest>): Promise<HttpResponse<CreateUserAccountAndSendMailResponse>> {
    const errors = this.validator.validate(request.body)
    if (errors) {
      return unprocessableEntity(errors)
    }
    const { name, email, password } = request.body
    try {
      await this.createUserAccountAndSendMailUseCase.create({
        name,
        email,
        password
      })
    } catch (error) {
      if (error instanceof EmailInUseError) {
        return conflict(error)
      }
      return serverError(error)
    }
    return noContent()
  }
}
