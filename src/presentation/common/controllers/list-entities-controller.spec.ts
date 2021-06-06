import { ListEntitiesController } from './list-entities-controller'
import { ListEntitiesUseCaseSpy } from '@/domain/common'
import { mockListEntitiesRequest } from '@/presentation/common/mocks'
import { ok, serverError } from '@/presentation/common/protocols'

type sutTypes = {
  sut: ListEntitiesController
  listEntitiesUseCase: ListEntitiesUseCaseSpy
}

const makeSut = (): sutTypes => {
  const listEntitiesUseCase = new ListEntitiesUseCaseSpy()
  const sut = new ListEntitiesController(listEntitiesUseCase)
  return {
    sut,
    listEntitiesUseCase
  }
}

describe('ListEntitiesController', () => {
  test('Should call ListEntitiesUseCase with correct value', async () => {
    const { sut, listEntitiesUseCase } = makeSut()
    const request = mockListEntitiesRequest()
    await sut.handle(request)
    expect(listEntitiesUseCase.filter).toEqual({
      page: request.queryParams.page,
      textToSearch: request.queryParams.search,
      recordsPerPage: request.queryParams.size,
      orderColumn: request.queryParams.order,
      orderDirection: request.queryParams.direction
    })
  })

  test('Should return serverError if ListEntitiesUseCase return expcetion', async () => {
    const { sut, listEntitiesUseCase } = makeSut()
    jest.spyOn(listEntitiesUseCase, 'list').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(mockListEntitiesRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return ok if ListEntitiesUseCase is succeeds', async () => {
    const { sut, listEntitiesUseCase } = makeSut()
    const response = await sut.handle(mockListEntitiesRequest())
    expect(response).toEqual(ok(listEntitiesUseCase.entities))
  })
})
