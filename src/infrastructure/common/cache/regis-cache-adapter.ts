import IORedis, { Redis as RedisClient, RedisOptions } from 'ioredis'
import { CreateCache, CreateCacheDTO, RecoverCacheByKey, InvalidateCacheByKey, InvalidateCacheByPrefix } from '@/data/common/protocols'

export type RedisCacheAdapterProps = RedisOptions

export class RedisCacheAdapter implements CreateCache, RecoverCacheByKey, InvalidateCacheByKey, InvalidateCacheByPrefix {
  client: RedisClient

  constructor (options: RedisCacheAdapterProps) {
    this.client = new IORedis(options)
  }

  async create <RecordType = object>({ key, record }: CreateCacheDTO<RecordType>): Promise<RecordType> {
    await this.client.set(key, JSON.stringify(record))
    return record
  }

  async recover<RecordType = object>(key: string): Promise<RecordType> {
    const record = await this.client.get(key)
    if (record) {
      return JSON.parse(record)
    }
    return undefined
  }

  async invalidateByKey (key: string): Promise<void> {
    await this.client.del(key)
  }

  async invalidateByPrefix (prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}&*`)

    const pipeline = this.client.pipeline()
    keys.forEach(key => pipeline.del(key))
    await pipeline.exec()
  }
}
