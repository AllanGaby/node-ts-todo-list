import { DbListEntitiesUseCase } from './db-list-entities-use-case'
import { ListEntitiesRepositorySpy } from '@/data/common/mocks'
import { mockEntityModel } from '@/domain/common'

type sutTypes = {
  sut: DbListEntitiesUseCase
  listEntitiesRepository: ListEntitiesRepositorySpy
}

const makeSut = (): sutTypes => {
  const listEntitiesRepository = new ListEntitiesRepositorySpy()
  const sut = new DbListEntitiesUseCase(listEntitiesRepository)
  return {
    sut,
    listEntitiesRepository
  }
}

describe('DbListEntitiesUseCase', () => {
  test('Should call ListEntitiesRepository with correct value', async () => {
    const { sut, listEntitiesRepository } = makeSut()
    const request = mockEntityModel()
    await sut.list(request)
    expect(listEntitiesRepository.filter).toEqual(request)
  })

  test('Should return correct list model if succeeds', async () => {
    const { sut, listEntitiesRepository } = makeSut()
    const entity = mockEntityModel()
    const list = await sut.list(entity)
    expect(list).toEqual(listEntitiesRepository.entities)
  })
})
