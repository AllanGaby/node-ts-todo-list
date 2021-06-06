import { InvalidateCacheByPrefix } from '@/data/common/protocols'

export class InvalidateCacheByPrefixSpy implements InvalidateCacheByPrefix {
  prefix: string

  async invalidateByPrefix (prefix: string): Promise<void> {
    this.prefix = prefix
  }
}
