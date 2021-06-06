import { InvalidateCacheByKey } from '@/data/common/protocols'

export class InvalidateCacheByKeySpy implements InvalidateCacheByKey {
  key: string

  async invalidateByKey (key: string): Promise<void> {
    this.key = key
  }
}
