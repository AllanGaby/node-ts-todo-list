import { DecryptRequestWithPrivateKey } from '@/data/auth/protocols'
import { CryptAdapter } from './crypto-adapter'

export class RSAFactory {
  static makeDecryptRequestWithPrivateKey = (privateKey: string): DecryptRequestWithPrivateKey => new CryptAdapter(privateKey)
}
