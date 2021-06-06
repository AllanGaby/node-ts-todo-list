import { EncryptModel } from './encrypt-model'

export interface DecryptWithSecret {
  decrypt: (token: string) => Promise<EncryptModel>
}
