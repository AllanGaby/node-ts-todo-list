import { DbValidateSessionByIdUseCase } from './db-validate-session-by-id-use-case'
import { SessionModel } from '@/domain/auth'
import { RecoverCacheByKeySpy, GetEntityByIdRepositorySpy } from '@/data/common/mocks'
import { SessionNotFoundError } from '@/data/auth/errors'
import faker from 'faker'

type sutTypes = {
  sut: DbValidateSessionByIdUseCase
  recoverCacheByKey: RecoverCacheByKeySpy
  getSessionByIdRepository: GetEntityByIdRepositorySpy<SessionModel>
}

const makeSut = (): sutTypes => {
  const recoverCacheByKey = new RecoverCacheByKeySpy()
  const getSessionByIdRepository = new GetEntityByIdRepositorySpy<SessionModel>()
  const sut = new DbValidateSessionByIdUseCase(recoverCacheByKey, getSessionByIdRepository)
  return {
    sut,
    recoverCacheByKey,
    getSessionByIdRepository
  }
}

describe('DbValidateSessionByIdUseCase', () => {
  test('Should call RecoverCacheByKey with correct value', async () => {
    const { sut, recoverCacheByKey } = makeSut()
    const sessionId = faker.random.uuid()
    await sut.validate(sessionId)
    expect(recoverCacheByKey.key).toBe(`session:${sessionId}`)
  })

  test('Should return same RecoverCacheByKey returns if RecoverCacheByKey return a session', async () => {
    const { sut, recoverCacheByKey } = makeSut()
    const session = await sut.validate(faker.random.uuid())
    expect(session).toEqual(recoverCacheByKey.record)
  })

  test('Should not call GetSessionByIdRepository if RecoverCacheByKey return a session', async () => {
    const { sut, getSessionByIdRepository } = makeSut()
    const getByIdSpy = jest.spyOn(getSessionByIdRepository, 'getById')
    await sut.validate(faker.random.uuid())
    expect(getByIdSpy).not.toBeCalled()
  })

  test('Should return SessionNotFoundError if GetSessionByIdRepository return undefined', async () => {
    const { sut, recoverCacheByKey, getSessionByIdRepository } = makeSut()
    recoverCacheByKey.record = undefined
    getSessionByIdRepository.entity = undefined
    const promise = sut.validate(faker.random.uuid())
    await expect(promise).rejects.toThrowError(SessionNotFoundError)
  })

  test('Should return same GetSessionByIdRepository return if return a session', async () => {
    const { sut, recoverCacheByKey, getSessionByIdRepository } = makeSut()
    recoverCacheByKey.record = undefined
    const session = await sut.validate(faker.random.uuid())
    expect(session).toEqual(getSessionByIdRepository.entity)
  })
})
