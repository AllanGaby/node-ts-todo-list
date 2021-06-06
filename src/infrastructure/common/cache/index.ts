import { CreateCache, RecoverCacheByKey, InvalidateCacheByKey, InvalidateCacheByPrefix } from '@/data/common/protocols'
import { MemoryCacheAdapter } from './memory-cache-adapter'
import { RedisCacheAdapter, RedisCacheAdapterProps } from './regis-cache-adapter'

export enum CacheType {
  Memory = 'Memory',
  Redis = 'Redis'
}

const getCacheAdapter = (props: CacheProps): CreateCache | RecoverCacheByKey | InvalidateCacheByKey | InvalidateCacheByPrefix => {
  switch (props.type) {
    case CacheType.Memory:
      return MemoryCacheAdapter.getInstance()
    case CacheType.Redis:
      return new RedisCacheAdapter(props)
  }
}

export type CacheProps = RedisCacheAdapterProps & {
  type: CacheType
}

export class CacheFactory {
  public static makeCreateCache (props: CacheProps): CreateCache {
    return getCacheAdapter(props) as CreateCache
  }

  public static makeRecoverCacheByKey (props: CacheProps): RecoverCacheByKey {
    return getCacheAdapter(props) as RecoverCacheByKey
  }

  public static makeInvalidateCacheByKey (props: CacheProps): InvalidateCacheByKey {
    return getCacheAdapter(props) as InvalidateCacheByKey
  }

  public static makeInvalidateCacheByPrefix (props: CacheProps): InvalidateCacheByPrefix {
    return getCacheAdapter(props) as InvalidateCacheByPrefix
  }
}
