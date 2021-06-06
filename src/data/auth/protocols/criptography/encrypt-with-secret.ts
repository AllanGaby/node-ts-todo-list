import { EncryptModel } from './encrypt-model'

export interface EncryptWithSecret {
  encrypt: (data: EncryptModel, expiresIn: string) => Promise<string>
}
