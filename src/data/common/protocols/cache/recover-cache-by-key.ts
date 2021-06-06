export interface RecoverCacheByKey {
  recover: <RecordType = object>(key: string) => Promise<RecordType>
}
