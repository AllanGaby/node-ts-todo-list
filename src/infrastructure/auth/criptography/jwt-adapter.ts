import { EncryptWithSecret, EncryptModel, DecryptWithSecret } from '@/data/auth/protocols'
import { sign, verify } from 'jsonwebtoken'

type VerifyResult = {
  iat: number
  exp: number
  sub: string
}

export class JWTAdapter implements EncryptWithSecret, DecryptWithSecret {
  constructor (
    private readonly secret: string
  ) {}

  async encrypt ({ payload, subject }: EncryptModel, expiresIn: string): Promise<string> {
    return sign(payload, this.secret, {
      subject,
      expiresIn
    })
  }

  async decrypt (token: string): Promise<EncryptModel> {
    const result = verify(token, this.secret) as VerifyResult
    const subject = result.sub
    delete result.sub
    delete result.iat
    delete result.exp
    return {
      subject,
      payload: result
    }
  }
}
