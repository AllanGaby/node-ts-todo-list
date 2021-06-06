import { conflict, Controller, created, HttpRequest, HttpResponse, noContent, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { CreateEntityUseCase } from '@/domain/common'
import { RequestValidator } from '@/validation/validations'
import { EntityAlreadyExistsError } from '@/data/common/errors'
import { CreateEntityRequest } from '@/presentation/common/requests'

type CreateEntityResponse<EntityType> = EntityType | Error | object

export class CreateEntityController<EntityType> implements Controller<CreateEntityRequest<EntityType>, CreateEntityResponse<EntityType>> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly createEntityUseCase: CreateEntityUseCase<EntityType>
  ) {}

  async handle (request: HttpRequest<CreateEntityRequest<EntityType>>): Promise<HttpResponse<CreateEntityResponse<EntityType>>> {
    const errors = this.validator.validate(Object(request.body))
    if (errors) {
      return unprocessableEntity(errors)
    }
    try {
      const entity = await this.createEntityUseCase.create(request.body)
      if (entity) {
        return created(entity)
      }
      return noContent()
    } catch (error) {
      if (error instanceof EntityAlreadyExistsError) {
        return conflict(error)
      }
      return serverError(error)
    }
  }
}
