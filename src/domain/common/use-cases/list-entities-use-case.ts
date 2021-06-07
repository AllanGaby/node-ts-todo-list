export interface ListEntitiesUseCase<RecortType = any> {
  list: (filter: Partial<RecortType>) => Promise<RecortType[]>
}
