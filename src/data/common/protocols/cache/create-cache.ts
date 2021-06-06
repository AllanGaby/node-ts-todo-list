export type CreateCacheDTO<RecordType = object> = {
  key: string
  record: RecordType
}

export interface CreateCache {
  create: <RecordType = object>(params: CreateCacheDTO<RecordType>) => Promise<RecordType>
}
