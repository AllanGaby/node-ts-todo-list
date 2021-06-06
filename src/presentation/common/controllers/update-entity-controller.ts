import { conflict, Controller, HttpRequest, HttpResponse, ok, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { UpdateEntityUseCase } from '@/domain/common'
import { RequestValidator } from '@/validation/validations'
import { EntityAlreadyExistsError } from '@/data/common/errors'
import { UpdateEntityRequest } from '@/presentation/common/requests'

export type UpdateEntityRequestDefault = {
  id: string
}

type UpdateEntityResponse<EntityType> = EntityType | Error | object

export class UpdateEntityController<EntityType, ParamsRequestType = UpdateEntityRequestDefault> implements Controller<UpdateEntityRequest<EntityType>, UpdateEntityResponse<EntityType>, any, ParamsRequestType> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly updateEntityUseCase: UpdateEntityUseCase<EntityType>,
    private readonly paramIdName: string
  ) {}

  async handle (request: HttpRequest<UpdateEntityRequest<EntityType>, any, any, UpdateEntityRequestDefault>): Promise<HttpResponse<UpdateEntityResponse<EntityType>>> {
    const errors = this.validator.validate(Object(request.body))
    if (errors) {
      return unprocessableEntity(errors)
    }
    try {
      const entity = await this.updateEntityUseCase.update(request.params[this.paramIdName], request.body)
      return ok(entity)
    } catch (error) {
      if (error instanceof EntityAlreadyExistsError) {
        return conflict(error)
      }
      return serverError(error)
    }
  }
}
