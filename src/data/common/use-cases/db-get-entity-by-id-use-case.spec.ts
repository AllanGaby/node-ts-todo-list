import { DbGetEntityByIdUseCase } from './db-get-entity-by-id-use-case'
import { GetEntityByIdRepositorySpy } from '@/data/common/mocks'
import { EntityIsNotFoundError } from '@/data/common/errors'
import faker from 'faker'

type sutTypes = {
  sut: DbGetEntityByIdUseCase
  entityName: string
  getEntityByIdRepository: GetEntityByIdRepositorySpy
}

const makeSut = (): sutTypes => {
  const getEntityByIdRepository = new GetEntityByIdRepositorySpy()
  const entityName = faker.database.column()
  const sut = new DbGetEntityByIdUseCase(getEntityByIdRepository, entityName)
  return {
    sut,
    entityName,
    getEntityByIdRepository
  }
}

describe('DbGetEntityByIdUseCase', () => {
  test('Should call GetEntityByIdRepository with correct value', async () => {
    const { sut, getEntityByIdRepository } = makeSut()
    const entityId = faker.random.uuid()
    await sut.getById(entityId)
    expect(getEntityByIdRepository.entityId).toBe(entityId)
  })

  test('Should return EntityIsNotFoundError if GetEntityByIdRepository returns undefined', async () => {
    const { sut, getEntityByIdRepository } = makeSut()
    getEntityByIdRepository.entity = undefined
    const promise = sut.getById(faker.random.uuid())
    await expect(promise).rejects.toThrowError(EntityIsNotFoundError)
  })

  test('Should return same GetEntityByIdRepository returns', async () => {
    const { sut, getEntityByIdRepository } = makeSut()
    const result = await sut.getById(faker.random.uuid())
    expect(result).toEqual(getEntityByIdRepository.entity)
  })
})
