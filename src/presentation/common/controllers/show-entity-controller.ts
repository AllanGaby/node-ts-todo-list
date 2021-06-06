import { Controller, HttpRequest, HttpResponse, notFound, ok, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { GetEntityByIdUseCase } from '@/domain/common'
import { RequestValidator } from '@/validation/validations'
import { EntityIdParamsRequestDefault } from '@/presentation/common/requests'
import { EntityIsNotFoundError } from '@/data/common/errors'

type ShowEntityResponse<EntityType> = EntityType | Error | object

export class ShowEntityController<EntityType, ParamsRequestType = EntityIdParamsRequestDefault> implements Controller<any, ShowEntityResponse<EntityType>, any, any, ParamsRequestType> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly getEntityByIdUseCase: GetEntityByIdUseCase<EntityType>,
    private readonly paramIdName: string
  ) {}

  async handle (request: HttpRequest<any, any, any, ParamsRequestType>): Promise<HttpResponse<ShowEntityResponse<EntityType>>> {
    const errors = this.validator.validate(Object(request.params))
    if (errors) {
      return unprocessableEntity(errors)
    }

    try {
      const entity = await this.getEntityByIdUseCase.getById(request.params[this.paramIdName])
      return ok(entity)
    } catch (error) {
      if (error instanceof EntityIsNotFoundError) {
        return notFound()
      }
      return serverError(error)
    }
  }
}
