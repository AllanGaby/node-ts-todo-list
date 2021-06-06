import { DecryptRequestWithPrivateKey } from '@/data/auth/protocols'
import crypto from 'crypto'

export class CryptAdapter implements DecryptRequestWithPrivateKey {
  constructor (
    private readonly privateKey: string
  ) {}

  decrypt (token: string): string {
    return crypto.privateDecrypt({
      key: this.privateKey,
      passphrase: '',
      padding: crypto.constants.RSA_PKCS1_PADDING
    }, Buffer.from(token, 'base64')).toString()
  }
}
