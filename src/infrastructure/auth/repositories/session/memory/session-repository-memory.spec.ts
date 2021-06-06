import { SessionRepositoryMemory } from './session-repository-memory'
import faker from 'faker'

type sutTypes = {
  sut: SessionRepositoryMemory
}

const makeSut = (): sutTypes => ({
  sut: SessionRepositoryMemory.getRepository()
})

describe('SessionRepositoryMemory', () => {
  beforeEach(() => {
    SessionRepositoryMemory.getRepository().entities = []
  })

  describe('DeleteByAccountId Method', () => {
    test('Should remove correct session', async () => {
      const { sut } = makeSut()
      const createdSession = await sut.create({ account_id: faker.random.uuid() })
      expect(SessionRepositoryMemory.getRepository().entities[0].id).toBe(createdSession.id)
      await sut.deleteByAccountId(createdSession.account_id)
      expect(SessionRepositoryMemory.getRepository().entities).toHaveLength(0)
    })
  })
})
