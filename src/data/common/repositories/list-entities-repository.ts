export interface ListEntitiesRepository<RecordType> {
  list: (filter: Partial<RecordType>) => Promise<RecordType[]>
}
