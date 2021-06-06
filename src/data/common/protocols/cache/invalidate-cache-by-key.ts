export interface InvalidateCacheByKey {
  invalidateByKey: (key: string) => Promise<void>
}
