import { Controller, HttpRequest, HttpResponse, ok, serverError } from '@/presentation/common/protocols'
import { ListEntitiesUseCase } from '@/domain/common'
import { ListEntitiesRequest } from '@/presentation/common/requests'

type ListEntitiesResponse<RecordType = object> = RecordType[] | Error | object

export class ListEntitiesController<RecordType = object> implements Controller<any, ListEntitiesResponse<RecordType>, any, ListEntitiesRequest> {
  constructor (
    private readonly listEntitiesUseCase: ListEntitiesUseCase
  ) {}

  async handle (request: HttpRequest<any, any, ListEntitiesRequest>): Promise<HttpResponse<ListEntitiesResponse>> {
    const { page, search, size, order, direction } = request.queryParams
    try {
      const list = await this.listEntitiesUseCase.list({
        page,
        textToSearch: search,
        recordsPerPage: size,
        orderColumn: String(order),
        orderDirection: direction
      })
      return ok(list)
    } catch (error) {
      return serverError(error)
    }
  }
}
