import { Controller, HttpRequest, HttpResponse, ok, serverError } from '@/presentation/common/protocols'
import { ListEntitiesUseCase } from '@/domain/common'
import { ListEntitiesRequest } from '@/presentation/common/requests'

type ListEntitiesResponse<RecordType = object> = RecordType[] | Error | object

export class ListEntitiesController<RecordType = object> implements Controller<any, ListEntitiesResponse<RecordType>, any, ListEntitiesRequest<RecordType>> {
  constructor (
    private readonly listEntitiesUseCase: ListEntitiesUseCase
  ) {}

  async handle (request: HttpRequest<any, any, ListEntitiesRequest<RecordType>>): Promise<HttpResponse<ListEntitiesResponse>> {
    try {
      const list = await this.listEntitiesUseCase.list(request.queryParams)
      return ok(list)
    } catch (error) {
      return serverError(error)
    }
  }
}
