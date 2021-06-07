import { CommonRepositoryMemory } from './common-repository-memory'
import { EntityModel, mockEntityModel } from '@/domain/common'
import faker from 'faker'

type sutTypes = {
  sut: CommonRepositoryMemory<EntityModel>
}

const makeSut = (): sutTypes => ({
  sut: new CommonRepositoryMemory<EntityModel>()
})

describe('CommonRepositoryMemory', () => {
  describe('GetById Method', () => {
    test('Should return undefined if entity is not found by id', async () => {
      const { sut } = makeSut()
      const entity = await sut.getById(faker.random.uuid())
      expect(entity).toBeFalsy()
    })

    test('Should return a entity with same provided id', async () => {
      const { sut } = makeSut()
      const mockedEntity = mockEntityModel()
      sut.entities.push(mockedEntity)
      sut.entities.push(mockEntityModel())
      sut.entities.push(mockEntityModel())
      const Entity = await sut.getById(mockedEntity.id)
      expect(Entity).toEqual(mockedEntity)
    })
  })

  describe('DeleteById Method', () => {
    test('Should delete correct entity by id', async () => {
      const { sut } = makeSut()
      const mockedEntity = mockEntityModel()
      sut.entities.push(mockedEntity)
      expect(sut.entities).toHaveLength(1)
      await sut.deleteById(mockedEntity.id)
      expect(sut.entities).toHaveLength(0)
    })

    test('Should not delete entity if entity is not found by id', async () => {
      const { sut } = makeSut()
      expect(sut.entities).toHaveLength(0)
      await sut.deleteById(faker.random.uuid())
      expect(sut.entities).toHaveLength(0)
    })
  })

  describe('List Method', () => {
    test('Should return undefined if entity not found by name', async () => {
      const { sut } = makeSut()
      const entity = await sut.list(mockEntityModel())
      expect(entity).toEqual([])
    })

    test('Should return a complete list if textToSearch is not provided', async () => {
      const { sut } = makeSut()
      sut.entities.push(mockEntityModel())
      sut.entities.push(mockEntityModel())
      sut.entities.push(mockEntityModel())
      sut.entities.push(mockEntityModel())
      const list = await sut.list(sut.entities[0])
      expect(list).toEqual([sut.entities[0]])
    })
  })

  describe('Create Method', () => {
    test('Should return new entity with correct values', async () => {
      const { sut } = makeSut()
      const createdEntity = await sut.create(mockEntityModel())
      expect(createdEntity.id).toBeTruthy()
      expect(createdEntity.created_at).toBeTruthy()
      expect(createdEntity.updated_at).toBeTruthy()
    })
  })

  describe('Update Method', () => {
    test('Should return a update Entity with correct values', async () => {
      const { sut } = makeSut()
      const request = mockEntityModel()
      sut.entities.push(mockEntityModel())
      sut.entities[0].id = request.id
      const updatedEntity = await sut.update(request)
      expect(updatedEntity.id).toBe(request.id)
    })

    test('Should return undefined if Entity is not found', async () => {
      const { sut } = makeSut()
      const updatedEntity = await sut.update(mockEntityModel())
      expect(updatedEntity).toBeFalsy()
    })
  })
})
