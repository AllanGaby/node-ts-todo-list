import { CreateHash } from '@/data/auth/protocols'
import faker from 'faker'

export class CreateHashSpy implements CreateHash {
  payload: string
  token: string = faker.random.uuid()

  async hash (payload: string): Promise<string> {
    this.payload = payload
    return this.token
  }
}
