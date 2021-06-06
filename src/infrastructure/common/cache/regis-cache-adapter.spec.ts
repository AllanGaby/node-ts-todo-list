import { mockCreateCacheDTO } from '@/data/common/mocks'
import { RedisCacheAdapter } from './regis-cache-adapter'
import { Config } from '@/main/config/environment'
import { PipelineSpy } from '@/infrastructure/common/mocks'
import faker from 'faker'

type sutTypes = {
  sut: RedisCacheAdapter
}

const makeSut = (): sutTypes => ({
  sut: new RedisCacheAdapter(Config.cache)
})

describe('RedisCacheAdapter', () => {
  describe('Create Method', () => {
    test('Should call set of ioredis with correct values', async () => {
      const { sut } = makeSut()
      const request = mockCreateCacheDTO()
      jest.spyOn(sut.client, 'set').mockImplementationOnce(() => {})
      const setSpy = jest.spyOn(sut.client, 'set')
      await sut.create(request)
      expect(setSpy).toHaveBeenCalledWith(request.key, JSON.stringify(request.record))
    })
  })

  describe('Recover Method', () => {
    test('Should call get of ioredis with correct values', async () => {
      const { sut } = makeSut()
      const request = mockCreateCacheDTO()
      jest.spyOn(sut.client, 'get').mockImplementationOnce(async (key: string): Promise<string> => { return JSON.stringify(request.record) })
      const getSpy = jest.spyOn(sut.client, 'get')
      await sut.recover(request.key)
      expect(getSpy).toHaveBeenCalledWith(request.key)
    })

    test('Should return undefined if key is not found', async () => {
      const { sut } = makeSut()
      jest.spyOn(sut.client, 'get').mockImplementationOnce(async (key: string): Promise<string> => { return undefined })
      const result = await sut.recover(faker.random.uuid())
      expect(result).toBeFalsy()
    })

    test('Should return correct record if key is found', async () => {
      const { sut } = makeSut()
      const request = mockCreateCacheDTO()
      jest.spyOn(sut.client, 'get').mockImplementationOnce(async (key: string): Promise<string> => { return JSON.stringify(request.record) })

      const result = await sut.recover(request.key)
      expect(result).toEqual(request.record)
    })
  })

  describe('InvalidateByKey Method', () => {
    test('Should call del of ioredis with correct values', async () => {
      const { sut } = makeSut()
      const request = mockCreateCacheDTO()
      jest.spyOn(sut.client, 'del').mockImplementationOnce(() => { return undefined })
      const delSpy = jest.spyOn(sut.client, 'del')
      await sut.invalidateByKey(request.key)
      expect(delSpy).toHaveBeenCalledWith(request.key)
    })
  })

  describe('InvalidateByPrefix Method', () => {
    test('Should call keys of ioredis with correct values', async () => {
      const { sut } = makeSut()
      const prefix = faker.database.column()
      jest.spyOn(sut.client, 'del').mockImplementationOnce(() => { return undefined })
      jest.spyOn(sut.client, 'keys').mockImplementationOnce(async (prefix: string): Promise<string[]> => { return [] })
      const keysSpy = jest.spyOn(sut.client, 'keys')
      await sut.invalidateByPrefix(prefix)
      expect(keysSpy).toHaveBeenCalledWith(`${prefix}&*`)
    })

    test('Should call del of ioredis with correct values', async () => {
      const { sut } = makeSut()
      const pipelineSpy = new PipelineSpy()
      const keys = [
        faker.random.uuid(),
        faker.random.uuid(),
        faker.random.uuid()
      ]
      jest.spyOn(sut.client, 'keys').mockImplementationOnce(async (prefix: string): Promise<string[]> => { return keys })
      jest.spyOn(sut.client, 'pipeline').mockImplementationOnce((commands: any): any => { return pipelineSpy })
      await sut.invalidateByPrefix(faker.database.column())
      expect(pipelineSpy.keys).toEqual(keys)
    })

    test('Should call exec of ioredis', async () => {
      const { sut } = makeSut()
      const pipelineSpy = new PipelineSpy()
      jest.spyOn(sut.client, 'keys').mockImplementationOnce(async (prefix: string): Promise<string[]> => { return [] })
      jest.spyOn(sut.client, 'pipeline').mockImplementationOnce((commands: any): any => { return pipelineSpy })
      const execSpy = jest.spyOn(pipelineSpy, 'exec')
      await sut.invalidateByPrefix(faker.database.column())
      expect(execSpy).toHaveBeenCalledWith()
    })
  })
})
