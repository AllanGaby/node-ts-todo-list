import { DbListEntitiesUseCase } from './db-list-entities-use-case'
import { CountEntitiesRepositorySpy, ListEntitiesRepositorySpy } from '@/data/common/mocks'
import { mockListEntitiesDTO, OrderDirection } from '@/domain/common'
import faker from 'faker'

type sutTypes = {
  sut: DbListEntitiesUseCase
  countEntitiesRepository: CountEntitiesRepositorySpy
  listEntitiesRepository: ListEntitiesRepositorySpy
}

const makeSut = (): sutTypes => {
  const countEntitiesRepository = new CountEntitiesRepositorySpy()
  const listEntitiesRepository = new ListEntitiesRepositorySpy()
  const sut = new DbListEntitiesUseCase(countEntitiesRepository, listEntitiesRepository)
  return {
    sut,
    countEntitiesRepository,
    listEntitiesRepository
  }
}

describe('DbListEntitiesUseCase', () => {
  test('Should call CountEntitiesRepository with correct value', async () => {
    const { sut, countEntitiesRepository } = makeSut()
    const request = mockListEntitiesDTO()
    await sut.list(request)
    expect(countEntitiesRepository.textToSearch).toBe(request.textToSearch)
  })

  test('Should not call ListEntitiesRepository if CountEntitiesRepository return 0', async () => {
    const { sut, countEntitiesRepository, listEntitiesRepository } = makeSut()
    countEntitiesRepository.recordCount = 0
    const listSpy = jest.spyOn(listEntitiesRepository, 'list')
    await sut.list(mockListEntitiesDTO())
    expect(listSpy).not.toHaveBeenCalled()
  })

  test('Should call ListEntitiesRepository with correct value', async () => {
    const { sut, listEntitiesRepository } = makeSut()
    const request = mockListEntitiesDTO()
    await sut.list(request)
    const { page, recordsPerPage, textToSearch, orderColumn, orderDirection } = request
    const skip = page === 1 ? 0 : page * recordsPerPage
    expect(listEntitiesRepository.filter).toEqual({
      skip,
      recordsPerPage,
      textToSearch,
      orderColumn,
      orderDirection
    })
  })

  test('Should call ListEntitiesRepository with correct value to page 1', async () => {
    const { sut, listEntitiesRepository } = makeSut()
    const request = mockListEntitiesDTO()
    request.page = 1
    await sut.list(request)
    const { recordsPerPage, textToSearch, orderColumn, orderDirection } = request
    expect(listEntitiesRepository.filter).toEqual({
      skip: 0,
      recordsPerPage,
      textToSearch,
      orderColumn,
      orderDirection
    })
  })

  test('Should call ListEntitiesRepository with correct if page is not provided', async () => {
    const { sut, listEntitiesRepository } = makeSut()
    const request = mockListEntitiesDTO()
    delete request.page
    await sut.list(request)
    const { recordsPerPage, textToSearch, orderColumn, orderDirection } = request
    expect(listEntitiesRepository.filter).toEqual({
      skip: 0,
      recordsPerPage,
      textToSearch,
      orderColumn,
      orderDirection
    })
  })

  test('Should call ListEntitiesRepository with correct if recordsPerPage is not provided', async () => {
    const { sut, listEntitiesRepository } = makeSut()
    const request = mockListEntitiesDTO()
    delete request.recordsPerPage
    const { page, textToSearch, orderColumn, orderDirection } = request
    const skip = page === 1 ? 0 : page * 15
    await sut.list(request)
    expect(listEntitiesRepository.filter).toEqual({
      skip,
      recordsPerPage: 15,
      textToSearch,
      orderColumn,
      orderDirection
    })
  })

  test('Should call ListEntitiesRepository with correct if orderDirection is not provided', async () => {
    const { sut, listEntitiesRepository } = makeSut()
    const request = mockListEntitiesDTO()
    delete request.orderDirection
    const { page, textToSearch, orderColumn, recordsPerPage } = request
    const skip = page === 1 ? 0 : page * recordsPerPage
    await sut.list(request)
    expect(listEntitiesRepository.filter).toEqual({
      skip,
      recordsPerPage,
      textToSearch,
      orderColumn,
      orderDirection: OrderDirection.ASC
    })
  })

  test('Should call ListEntitiesRepository with correct if recordsPerPage is small or equal zero', async () => {
    const { sut, listEntitiesRepository } = makeSut()
    const request = mockListEntitiesDTO()
    request.recordsPerPage = faker.random.number(-1)
    const { page, textToSearch, orderColumn, orderDirection } = request
    const skip = page === 1 ? 0 : page * 15
    await sut.list(request)
    expect(listEntitiesRepository.filter).toEqual({
      skip,
      recordsPerPage: 15,
      textToSearch,
      orderColumn,
      orderDirection
    })
  })

  test('Should return correct list model if succeeds', async () => {
    const { sut, listEntitiesRepository, countEntitiesRepository } = makeSut()
    const request = mockListEntitiesDTO()
    const list = await sut.list(request)
    expect(list).toEqual({
      data: listEntitiesRepository.entities,
      page: request.page,
      record_count: countEntitiesRepository.recordCount,
      last_page: countEntitiesRepository.recordCount % request.recordsPerPage === 0 ? countEntitiesRepository.recordCount / request.recordsPerPage : (countEntitiesRepository.recordCount / request.recordsPerPage) + 1
    })
  })

  test('Should return correct list model if succeeds and recordCount is divisible per recordsPerPage', async () => {
    const { sut, listEntitiesRepository, countEntitiesRepository } = makeSut()
    const request = mockListEntitiesDTO()
    countEntitiesRepository.recordCount = request.recordsPerPage * faker.random.number()
    const list = await sut.list(request)
    expect(list).toEqual({
      data: listEntitiesRepository.entities,
      page: request.page,
      record_count: countEntitiesRepository.recordCount,
      last_page: countEntitiesRepository.recordCount / request.recordsPerPage
    })
  })
})
