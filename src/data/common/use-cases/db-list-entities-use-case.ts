import { ListEntitiesUseCase, ListEntitiesDTO, OrderDirection, ListEntityModel } from '@/domain/common'
import { ListEntitiesRepository, CountEntitiesRepository } from '@/data/common/repositories'

export class DbListEntitiesUseCase<EntityType = object> implements ListEntitiesUseCase<EntityType> {
  constructor (
    private readonly countEntitiesRepository: CountEntitiesRepository<EntityType>,
    private readonly listEntitiesRepository: ListEntitiesRepository<EntityType>
  ) {}

  async list ({ textToSearch, page = 1, recordsPerPage = 15, orderDirection = OrderDirection.ASC, orderColumn }: ListEntitiesDTO): Promise<ListEntityModel<EntityType>> {
    const recordCount = await this.countEntitiesRepository.count(textToSearch) as number
    if (recordCount === 0) {
      return {
        data: [],
        last_page: 0,
        page: 0,
        record_count: 0
      }
    }
    const pageSize = recordsPerPage <= 0 ? 15 : recordsPerPage
    const skip = page === 1 ? 0 : page * pageSize
    const lastPage = recordCount % pageSize === 0 ? recordCount / pageSize : (recordCount / pageSize) + 1
    const data = await this.listEntitiesRepository.list({
      skip,
      recordsPerPage: pageSize,
      textToSearch,
      orderColumn,
      orderDirection
    })

    return {
      data,
      last_page: lastPage,
      page,
      record_count: recordCount
    }
  }
}
