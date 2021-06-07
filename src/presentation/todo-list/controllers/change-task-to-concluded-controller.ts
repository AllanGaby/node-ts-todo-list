import { conflict, Controller, HttpRequest, HttpResponse, ok, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { ChangeTaskToConcludedUseCase, TaskModel } from '@/domain/todo-list'
import { RequestValidator } from '@/validation/validations'
import { EntityIsNotFoundError } from '@/data/common/errors'
import { UpdateEntityRequestDefault } from '@/presentation/common/controllers'

type ChangeTaskToConcludedResponse = TaskModel | Error | object

export class ChangeTaskToConcludedController implements Controller<any, ChangeTaskToConcludedResponse, any, UpdateEntityRequestDefault> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly changeTaskToConcludedUseCase: ChangeTaskToConcludedUseCase
  ) {}

  async handle (request: HttpRequest<any, any, any, UpdateEntityRequestDefault>): Promise<HttpResponse<ChangeTaskToConcludedResponse>> {
    const errors = this.validator.validate(Object(request.body))
    if (errors) {
      return unprocessableEntity(errors)
    }
    try {
      const entity = await this.changeTaskToConcludedUseCase.concluded(request.params.id)
      return ok(entity)
    } catch (error) {
      if (error instanceof EntityIsNotFoundError) {
        return conflict(error)
      }
      return serverError(error)
    }
  }
}
