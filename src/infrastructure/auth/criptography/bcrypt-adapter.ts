import { CreateHash, CompareHash, CompareHashDTO } from '@/data/auth/protocols'
import bcrypt from 'bcrypt'

export class BCryptAdapter implements CreateHash, CompareHash {
  constructor (
    private readonly salt: number
  ) {}

  async hash (payload: string): Promise<string> {
    return await bcrypt.hash(payload, this.salt)
  }

  async compare ({ payload, hash }: CompareHashDTO): Promise<boolean> {
    return await bcrypt.compare(payload, hash)
  }
}
