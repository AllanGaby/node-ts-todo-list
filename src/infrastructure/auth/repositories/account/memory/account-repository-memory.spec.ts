import { AccountRepositoryMemory } from './account-repository-memory'
import { mockAccountModel } from '@/domain/auth'
import faker from 'faker'

type sutTypes = {
  sut: AccountRepositoryMemory
}

const makeSut = (): sutTypes => ({
  sut: AccountRepositoryMemory.getRepository()
})

describe('AccountRepositoryMemory', () => {
  beforeEach(() => {
    AccountRepositoryMemory.getRepository().entities = []
  })

  describe('GetByEmail Method', () => {
    test('Should return undefined if account not found by email', async () => {
      const { sut } = makeSut()
      const account = await sut.getByEmail(faker.internet.email())
      expect(account).toBeFalsy()
    })

    test('Should return a account if account is found by email', async () => {
      const { sut } = makeSut()
      const mockedAccount = mockAccountModel()
      sut.entities.push(mockedAccount)
      const account = await sut.getByEmail(mockedAccount.email)
      expect(account).toEqual(mockedAccount)
    })
  })
})
