import { JWTAdapter } from './jwt-adapter'
import { mockEncryptModel } from '@/data/auth/mocks'
import faker from 'faker'
import jsonwebtoken from 'jsonwebtoken'

jest.mock('jsonwebtoken')

type sutTypes = {
  sut: JWTAdapter
  secret: string
}

const makeSut = (): sutTypes => {
  const secret = faker.random.uuid()
  const sut = new JWTAdapter(secret)
  return {
    sut,
    secret
  }
}

describe('JWTAdapter', () => {
  describe('Encrypt Method', () => {
    test('Should call sign with correct value', async () => {
      const { sut, secret } = makeSut()
      const expiresIn = `${faker.random.number({ min: 1, max: 30 })}d`
      const signSpy = jest.spyOn(jsonwebtoken, 'sign')
      const params = mockEncryptModel()
      await sut.encrypt(params, expiresIn)
      expect(signSpy).toHaveBeenCalledWith(params.payload, secret, {
        subject: params.subject,
        expiresIn
      })
    })

    test('Should return correct value', async () => {
      const { sut } = makeSut()
      const token = faker.random.uuid()
      const expiresIn = `${faker.random.number({ min: 1, max: 30 })}d`
      jest.spyOn(jsonwebtoken, 'sign').mockImplementationOnce((payload: string, secret: string): string => { return token })
      const result = await sut.encrypt(mockEncryptModel(), expiresIn)
      expect(result).toBe(token)
    })
  })

  describe('Decrypt Method', () => {
    test('Should call verify with correct value', async () => {
      const { sut, secret } = makeSut()
      const encryptModel = mockEncryptModel()
      jest.spyOn(jsonwebtoken, 'verify').mockImplementationOnce((token: string, secret: string): object => { return { ...encryptModel.payload, sub: encryptModel.subject } })
      const verifySpy = jest.spyOn(jsonwebtoken, 'verify')
      const token = faker.random.uuid()
      await sut.decrypt(token)
      expect(verifySpy).toHaveBeenCalledWith(token, secret)
    })

    test('Should decrypted value', async () => {
      const { sut } = makeSut()
      const encryptModel = mockEncryptModel()
      jest.spyOn(jsonwebtoken, 'verify').mockImplementationOnce((token: string, secret: string): object => { return { ...encryptModel.payload, sub: encryptModel.subject } })
      const decrypted = await sut.decrypt(faker.random.uuid())
      expect(decrypted.subject).toBe(encryptModel.subject)
      expect(decrypted.payload).toEqual(encryptModel.payload)
    })
  })
})
