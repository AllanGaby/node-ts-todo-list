import { CreateHash, CompareHash, EncryptWithSecret, DecryptWithSecret } from '@/data/auth/protocols'
import { BCryptAdapter } from './bcrypt-adapter'
import { JWTAdapter } from './jwt-adapter'

const getHashAdapter = (salt: number): CreateHash | CompareHash => new BCryptAdapter(salt)

const getEncryptAdapter = (privateKey: string): EncryptWithSecret | DecryptWithSecret => new JWTAdapter(privateKey)

export class CriptographyFactory {
  static makeCreateHash = (salt: number): CreateHash => getHashAdapter(salt) as CreateHash
  static makeCompareHash = (salt: number): CompareHash => getHashAdapter(salt) as CompareHash

  static makeEncryptWithSecret = (privateKey: string): EncryptWithSecret => getEncryptAdapter(privateKey) as EncryptWithSecret
  static makeDecryptWithSecret = (privateKey: string): DecryptWithSecret => getEncryptAdapter(privateKey) as DecryptWithSecret
}
