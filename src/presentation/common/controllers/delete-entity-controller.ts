import { Controller, HttpRequest, HttpResponse, noContent, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { DeleteEntityByIdUseCase } from '@/domain/common'
import { RequestValidator } from '@/validation/validations'
import { EntityIdParamsRequestDefault } from '@/presentation/common/requests'

type DeleteEntityResponse = undefined | Error | object

export class DeleteEntityController<EntityType, ParamsRequestType = EntityIdParamsRequestDefault> implements Controller<any, DeleteEntityResponse, any, any, ParamsRequestType> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly deleteEntityByIdUseCase: DeleteEntityByIdUseCase<EntityType>,
    private readonly paramIdName: string
  ) {}

  async handle (request: HttpRequest<any, any, any, ParamsRequestType>): Promise<HttpResponse<DeleteEntityResponse>> {
    const errors = this.validator.validate(Object(request.params))
    if (errors) {
      return unprocessableEntity(errors)
    }

    try {
      await this.deleteEntityByIdUseCase.deleteById(request.params[this.paramIdName])
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
