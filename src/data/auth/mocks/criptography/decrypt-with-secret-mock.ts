import { DecryptWithSecret, EncryptModel } from '@/data/auth/protocols'
import { mockEncryptModel } from '@/data/auth/mocks'

export class DecryptWithSecretSpy implements DecryptWithSecret {
  token: string
  decryptedModel: EncryptModel = mockEncryptModel()

  async decrypt (token: string): Promise<EncryptModel> {
    this.token = token
    return this.decryptedModel
  }
}
