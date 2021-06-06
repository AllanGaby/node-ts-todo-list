import { DbDeleteEntityByIdUseCase } from './db-delete-entity-by-id-use-case'
import { DeleteEntityByIdRepositorySpy } from '@/data/common/mocks'
import faker from 'faker'

type sutTypes = {
  sut: DbDeleteEntityByIdUseCase<object>
  deleteEntityByIdRepository: DeleteEntityByIdRepositorySpy<object>
}

const makeSut = (): sutTypes => {
  const deleteEntityByIdRepository = new DeleteEntityByIdRepositorySpy<object>()
  const sut = new DbDeleteEntityByIdUseCase(deleteEntityByIdRepository)
  return {
    sut,
    deleteEntityByIdRepository
  }
}

describe('DbDeleteEntityByIdUseCase', () => {
  test('Should call DeleteEntityByIdRepository with correct value', async () => {
    const { sut, deleteEntityByIdRepository } = makeSut()
    const entityId = faker.random.uuid()
    await sut.deleteById(entityId)
    expect(deleteEntityByIdRepository.entityId).toBe(entityId)
  })

  test('Should return void if DeleteEntityByIdRepository is succeeds', async () => {
    const { sut } = makeSut()
    await sut.deleteById(faker.random.uuid())
  })
})
