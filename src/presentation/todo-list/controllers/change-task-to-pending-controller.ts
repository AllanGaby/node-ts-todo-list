import { conflict, Controller, HttpRequest, HttpResponse, ok, serverError, unprocessableEntity, forbidden, unauthorized } from '@/presentation/common/protocols'
import { ChangeTaskToPendingUseCase, TaskModel } from '@/domain/todo-list'
import { RequestValidator } from '@/validation/validations'
import { AccessDeniedError, EntityIsNotFoundError, InvalidCredentialsError } from '@/data/common/errors'
import { UpdateEntityRequestDefault } from '@/presentation/common/controllers'
import { ChangeTaskToPendingRequest } from '@/presentation/todo-list/requests'

type ChangeTaskToPendingResponse = TaskModel | Error | object

export class ChangeTaskToPendingController implements Controller<ChangeTaskToPendingRequest, ChangeTaskToPendingResponse, any, UpdateEntityRequestDefault> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly changeTaskToPendingUseCase: ChangeTaskToPendingUseCase
  ) {}

  async handle (request: HttpRequest<ChangeTaskToPendingRequest, any, any, UpdateEntityRequestDefault>): Promise<HttpResponse<ChangeTaskToPendingResponse>> {
    const errors = this.validator.validate(Object(request.body))
    if (errors) {
      return unprocessableEntity(errors)
    }
    try {
      const entity = await this.changeTaskToPendingUseCase.pending({
        id: request.params.id,
        password: request.body.password
      })
      return ok(entity)
    } catch (error) {
      if (error instanceof EntityIsNotFoundError) {
        return conflict(error)
      }
      if (error instanceof AccessDeniedError) {
        return forbidden(error)
      }
      if (error instanceof InvalidCredentialsError) {
        return unauthorized(error)
      }
      return serverError(error)
    }
  }
}
