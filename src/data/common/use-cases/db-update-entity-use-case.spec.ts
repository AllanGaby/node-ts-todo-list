import { DbUpdateEntityUseCase } from './db-update-entity-use-case'
import { EntityModel, mockEntityModel } from '@/domain/common'
import { UpdateEntityRepositorySpy } from '@/data/common/mocks'

type sutTypes = {
  sut: DbUpdateEntityUseCase<EntityModel>
  UpdateEntityRepository: UpdateEntityRepositorySpy
}

const makeSut = (): sutTypes => {
  const UpdateEntityRepository = new UpdateEntityRepositorySpy()
  const sut = new DbUpdateEntityUseCase<EntityModel>(UpdateEntityRepository)
  return {
    sut,
    UpdateEntityRepository
  }
}

describe('DbUpdateEntityUseCase', () => {
  test('Should call UpdateEntityRepository with correct value', async () => {
    const { sut, UpdateEntityRepository } = makeSut()
    const request = mockEntityModel()
    await sut.update(request.id, request)
    expect(UpdateEntityRepository.params).toEqual(request)
  })

  test('Should return same UpdateEntityRepository returns', async () => {
    const { sut, UpdateEntityRepository } = makeSut()
    const request = mockEntityModel()
    const result = await sut.update(request.id, request)
    expect(result).toEqual(UpdateEntityRepository.entity)
  })
})
