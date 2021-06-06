import { AccountRepositoryTypeORM } from './account-repository-typeorm'
import { mockAccountModel } from '@/domain/auth'
import { TypeOrmRepositorySpy } from '@/infrastructure/common/mocks/typeorm'
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
  sut: AccountRepositoryTypeORM
}

const makeSut = (): sutTypes => ({
  sut: new AccountRepositoryTypeORM()
})

describe('AccountRepositoryTypeORM', () => {
  describe('GetByEmail Method', () => {
    test('Should call FindOne with correct value', async () => {
      const { sut } = makeSut()
      const findOneSpy = jest.spyOn(sut.repositoryTypeORM, 'findOne')
      const email = faker.internet.email()
      await sut.getByEmail(email)
      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          email
        }
      })
    })

    test('Should return same FindOne return', async () => {
      const { sut } = makeSut()
      const account = mockAccountModel()
      jest.spyOn(sut.repositoryTypeORM, 'findOne').mockResolvedValue(account)
      const findAccount = await sut.getByEmail(faker.internet.email())
      expect(findAccount).toEqual(account)
    })
  })
})
