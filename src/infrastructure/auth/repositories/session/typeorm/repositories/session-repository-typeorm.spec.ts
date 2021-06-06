import { SessionRepositoryTypeORM } from './session-repository-typeorm'
import { TypeOrmRepositorySpy } from '@/infrastructure/common/mocks'
import faker from 'faker'

jest.mock('typeorm', () => ({
  Entity: () => {},
  PrimaryGeneratedColumn: () => {},
  Column: () => {},
  CreateDateColumn: () => {},
  UpdateDateColumn: () => {},
  getRepository: () => { return new TypeOrmRepositorySpy() }
}))

type sutTypes = {
  sut: SessionRepositoryTypeORM
}

const makeSut = (): sutTypes => ({
  sut: new SessionRepositoryTypeORM()
})

describe('SessionRepositoryTypeORM', () => {
  describe('DeleteById Method', () => {
    test('Should call delete with correct value', async () => {
      const { sut } = makeSut()
      const deleteSpy = jest.spyOn(sut.repositoryTypeORM, 'delete')
      const accountId = faker.random.uuid()
      await sut.deleteByAccountId(accountId)
      expect(deleteSpy).toHaveBeenCalledWith({
        account_id: accountId
      })
    })
  })
})
