export interface InvalidateCacheByPrefix {
  invalidateByPrefix: (prefix: string) => Promise<void>
}
