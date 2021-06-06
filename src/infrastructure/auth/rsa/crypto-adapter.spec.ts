import { CryptAdapter } from './crypto-adapter'
import faker from 'faker'
import crypto from 'crypto'

type sutTypes = {
  sut: CryptAdapter
  privateKey: string
}

const makeSut = (): sutTypes => {
  const privateKey = faker.random.uuid()
  const sut = new CryptAdapter(privateKey)
  return {
    sut,
    privateKey
  }
}

describe('CryptAdapter', () => {
  test('Should call privateDecrypt with correct value', () => {
    const { sut, privateKey } = makeSut()
    const message = faker.random.words()
    jest.spyOn(crypto, 'privateDecrypt').mockImplementationOnce((): Buffer => { return Buffer.from('') })
    const privateDecryptSpy = jest.spyOn(crypto, 'privateDecrypt')
    sut.decrypt(message)
    expect(privateDecryptSpy).toHaveBeenCalledWith({
      key: privateKey,
      passphrase: '',
      padding: crypto.constants.RSA_PKCS1_PADDING
    }, Buffer.from(message, 'base64'))
  })

  test('Should return message decrypted', () => {
    const { sut } = makeSut()
    const decryptedMessage = faker.random.words()
    jest.spyOn(crypto, 'privateDecrypt').mockImplementationOnce((): Buffer => {
      return Buffer.from(decryptedMessage)
    })
    const result = sut.decrypt(faker.random.uuid())
    expect(result).toEqual(decryptedMessage)
  })
})
