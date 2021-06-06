import { DbLogoutUseCase } from './db-logout-use-case'
import { InvalidateCacheByKeySpy, DeleteEntityByIdRepositorySpy } from '@/data/common/mocks'
import { SessionModel } from '@/domain/auth'
import faker from 'faker'

type sutTypes = {
  sut: DbLogoutUseCase
  invalidateCacheByKey: InvalidateCacheByKeySpy
  deleteSessionByIdRepository: DeleteEntityByIdRepositorySpy<SessionModel>
}

const makeSut = (): sutTypes => {
  const invalidateCacheByKey = new InvalidateCacheByKeySpy()
  const deleteSessionByIdRepository = new DeleteEntityByIdRepositorySpy<SessionModel>()
  const sut = new DbLogoutUseCase(invalidateCacheByKey, deleteSessionByIdRepository)
  return {
    sut,
    invalidateCacheByKey,
    deleteSessionByIdRepository
  }
}

describe('DbLogoutUseCase', () => {
  test('Should call InvalidateCacheByKey with correct value', async () => {
    const { sut, invalidateCacheByKey } = makeSut()
    const sessionId = faker.random.uuid()
    await sut.logout(sessionId)
    expect(invalidateCacheByKey.key).toBe(`session:${sessionId}`)
  })

  test('Should call DeleteSessionByIdRepository with correct value', async () => {
    const { sut, deleteSessionByIdRepository } = makeSut()
    const sessionId = faker.random.uuid()
    await sut.logout(sessionId)
    expect(deleteSessionByIdRepository.entityId).toBe(sessionId)
  })
})
