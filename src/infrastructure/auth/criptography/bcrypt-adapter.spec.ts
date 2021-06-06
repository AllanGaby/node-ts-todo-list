import { BCryptAdapter } from './bcrypt-adapter'
import { mockCompareHashDTO } from '@/infrastructure/auth/mocks'
import bcrypt from 'bcrypt'
import faker from 'faker'

type sutTypes = {
  sut: BCryptAdapter
  salt: number
}

const makeSut = (): sutTypes => {
  const salt = faker.random.number({ min: 1, max: 13 })
  const sut = new BCryptAdapter(salt)
  return {
    sut,
    salt
  }
}

describe('BCryptAdapter', () => {
  describe('Hash Method', () => {
    test('Should call hash with correct value', async () => {
      const { sut, salt } = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      const payload = faker.random.words()
      await sut.hash(payload)
      expect(hashSpy).toHaveBeenCalledWith(payload, salt)
    })

    test('Shoudl return correct hash', async () => {
      const { sut } = makeSut()
      const hash = faker.random.uuid()
      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(hash)
      const result = await sut.hash(faker.random.words())
      expect(result).toBe(hash)
    })
  })

  describe('Compare Method', () => {
    test('Shoudl call compare with correct value', async () => {
      const { sut } = makeSut()
      const params = mockCompareHashDTO()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare(params)
      expect(compareSpy).toHaveBeenCalledWith(params.payload, params.hash)
    })

    test('Should return correct value if compare is succeeds', async () => {
      const { sut } = makeSut()
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true)
      const result = await sut.compare(mockCompareHashDTO())
      expect(result).toBeTruthy()
    })

    test('Should return correct value if compare is fails', async () => {
      const { sut } = makeSut()
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false)
      const result = await sut.compare(mockCompareHashDTO())
      expect(result).toBeFalsy()
    })
  })
})
