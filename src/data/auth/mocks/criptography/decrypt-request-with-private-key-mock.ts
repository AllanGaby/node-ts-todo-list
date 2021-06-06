import { DecryptRequestWithPrivateKey } from '@/data/auth/protocols'
import faker from 'faker'

export class DecryptRequestWithPrivateKeySpy implements DecryptRequestWithPrivateKey {
  token: string
  result: string = faker.random.uuid()

  decrypt (token: string): string {
    this.token = token
    return this.result
  }
}
