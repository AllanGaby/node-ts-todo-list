export interface CountEntitiesRepository<RecordType> {
  count: (textToSearch?: string) => Promise<number | RecordType>
}
