import { CommonRepositoryTypeORM } from './common-repository-typeorm'
import { mockEntityModel } from '@/domain/common'
import { TypeOrmRepositorySpy } from '@/infrastructure/common/mocks'
import { DefaultEntity } from '@/infrastructure/common/repositories'
import { getRepository } from 'typeorm'
import { mockListEntitiesRepositoryDTO } from '@/data/common/mocks'
import faker from 'faker'

jest.mock('typeorm', () => ({
  Entity: () => {},
  PrimaryGeneratedColumn: () => {},
  ManyToMany: () => {},
  JoinTable: () => {},
  OneToMany: () => {},
  ManyToOne: () => {},
  JoinColumn: () => {},
  Column: () => {},
  CreateDateColumn: () => {},
  UpdateDateColumn: () => {},
  Like: () => {},
  ILike: () => {},
  getRepository: () => { return new TypeOrmRepositorySpy() }
}))

type sutTypes = {
  sut: CommonRepositoryTypeORM<DefaultEntity>
}

const makeSut = (): sutTypes => {
  const sut = new CommonRepositoryTypeORM<DefaultEntity>()
  sut.repositoryTypeORM = getRepository<DefaultEntity>(DefaultEntity)
  return {
    sut
  }
}

describe('CommonRepositoryTypeORM', () => {
  describe('GetById Method', () => {
    test('Should call FindOne with correct value', async () => {
      const { sut } = makeSut()
      const findOneSpy = jest.spyOn(sut.repositoryTypeORM, 'findOne')
      const entityId = faker.random.uuid()
      await sut.getById(entityId)
      expect(findOneSpy).toHaveBeenCalledWith(entityId)
    })

    test('Should return same FindOne return', async () => {
      const { sut } = makeSut()
      const entity = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'findOne').mockResolvedValue(entity as DefaultEntity)
      const findEntity = await sut.getById(entity.id)
      expect(findEntity).toEqual(entity)
    })
  })

  describe('DeleteById Method', () => {
    test('Should call delete with correct value', async () => {
      const { sut } = makeSut()
      const deleteSpy = jest.spyOn(sut.repositoryTypeORM, 'delete')
      const entityId = faker.random.uuid()
      await sut.deleteById(entityId)
      expect(deleteSpy).toHaveBeenCalledWith(entityId)
    })
  })

  describe('List Method', () => {
    test('Should call Find with correct value if textToSearch is provided', async () => {
      const { sut } = makeSut()
      const findSpy = jest.spyOn(sut.repositoryTypeORM, 'find')
      const request = mockListEntitiesRepositoryDTO()
      await sut.list(request)
      expect(findSpy).toHaveBeenCalledWith({
        where: request
      })
    })
  })

  describe('Create Method', () => {
    test('Should call Create with correct values', async () => {
      const { sut } = makeSut()
      const createSpy = jest.spyOn(sut.repositoryTypeORM, 'create')
      const request = mockEntityModel()
      await sut.create(request)
      expect(createSpy).toHaveBeenCalledWith(request)
    })

    test('Should call save with correct values', async () => {
      const { sut } = makeSut()
      const entity = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'create').mockReturnValue(entity)
      const saveSpy = jest.spyOn(sut.repositoryTypeORM, 'save')
      await sut.create(entity)
      expect(saveSpy).toHaveBeenCalledWith(entity)
    })

    test('Should return a new entity if succeeds', async () => {
      const { sut } = makeSut()
      const entity = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'create').mockReturnValue(entity)
      const createdEntity = await sut.create(entity)
      expect(createdEntity).toEqual(entity)
    })
  })

  describe('Update Method', () => {
    test('Should call FindOne with correct value', async () => {
      const { sut } = makeSut()
      const findOneSpy = jest.spyOn(sut.repositoryTypeORM, 'findOne')
      const request = mockEntityModel()
      await sut.update(request)
      expect(findOneSpy).toHaveBeenCalledWith(request.id)
    })

    test('Should return undefined if account is not found', async () => {
      const { sut } = makeSut()
      jest.spyOn(sut.repositoryTypeORM, 'findOne').mockImplementationOnce(() => { return undefined })
      const updatedAccount = await sut.update(mockEntityModel())
      expect(updatedAccount).toBeFalsy()
    })

    test('Should call save with correct values', async () => {
      const { sut } = makeSut()
      const account = mockEntityModel()
      const request = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'findOne').mockResolvedValue(account)
      const saveSpy = jest.spyOn(sut.repositoryTypeORM, 'save')
      await sut.update(request)
      expect(saveSpy).toHaveBeenCalledWith({
        ...account,
        ...request
      })
    })

    test('Should return a updated account if succeeds', async () => {
      const { sut } = makeSut()
      const account = mockEntityModel()
      const request = mockEntityModel()
      jest.spyOn(sut.repositoryTypeORM, 'findOne').mockResolvedValue(account)
      const updatedAccount = await sut.update(request)
      expect(updatedAccount).toEqual({
        ...account,
        ...request
      })
    })
  })
})
