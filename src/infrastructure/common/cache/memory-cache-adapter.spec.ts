import { MemoryCacheAdapter } from './memory-cache-adapter'
import { mockCreateCacheDTO } from '@/data/common/mocks'
import faker from 'faker'

interface sutTypes {
  sut: MemoryCacheAdapter
}

const makeSut = (): sutTypes => {
  return {
    sut: MemoryCacheAdapter.getInstance()
  }
}

describe('MemoryCacheAdapter', () => {
  afterEach(() => {
    MemoryCacheAdapter.getInstance().records = {}
  })

  describe('Create Method', () => {
    test('Should include correct value in memory', async () => {
      const { sut } = makeSut()
      const request = mockCreateCacheDTO()
      await sut.create(request)
      expect(sut.records[request.key]).toEqual(JSON.stringify(request.record))
    })

    test('Should replace correct value in memory if key is in use', async () => {
      const { sut } = makeSut()
      const request = mockCreateCacheDTO()
      const oldRecord = faker.random.uuid()
      sut.records[request.key] = oldRecord
      await sut.create(request)
      expect(sut.records[request.key]).not.toEqual(oldRecord)
      expect(sut.records[request.key]).toEqual(JSON.stringify(request.record))
    })
  })

  describe('Recover Method', () => {
    test('Should return undefined if key is not found', async () => {
      const { sut } = makeSut()
      const result = await sut.recover(faker.random.uuid())
      expect(result).toBeFalsy()
    })

    test('Should return correct record if key is found', async () => {
      const { sut } = makeSut()
      const request = mockCreateCacheDTO()
      await sut.create(request)

      const result = await sut.recover(request.key)
      expect(result).toEqual(request.record)
    })
  })

  describe('InvalidateByKey Method', () => {
    test('Should remove correct record', async () => {
      const { sut } = makeSut()
      const request = mockCreateCacheDTO()
      await sut.create(request)

      await sut.invalidateByKey(request.key)
      expect(sut.records[request.key]).toBeFalsy()
    })
  })

  describe('InvalidateByPrefix Method', () => {
    test('Should remove correct records starting with prefix', async () => {
      const prefix = faker.random.uuid()
      const { sut } = makeSut()
      const recordWithoutPrefix = mockCreateCacheDTO()
      const recordWithPrefix1 = mockCreateCacheDTO(prefix)
      const recordWithPrefix2 = mockCreateCacheDTO(prefix)
      await sut.create(recordWithoutPrefix)
      await sut.create(recordWithPrefix1)
      await sut.create(recordWithPrefix2)
      expect(sut.records[recordWithoutPrefix.key]).toEqual(JSON.stringify(recordWithoutPrefix.record))
      expect(sut.records[recordWithPrefix1.key]).toEqual(JSON.stringify(recordWithPrefix1.record))
      expect(sut.records[recordWithPrefix2.key]).toEqual(JSON.stringify(recordWithPrefix2.record))

      await sut.invalidateByPrefix(prefix)
      expect(sut.records[recordWithoutPrefix.key]).toEqual(JSON.stringify(recordWithoutPrefix.record))
      expect(sut.records[recordWithPrefix1.key]).toBeFalsy()
      expect(sut.records[recordWithPrefix2.key]).toBeFalsy()
    })
  })
})
