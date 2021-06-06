import { EntityIsNotFoundError } from '@/data/common/errors'

export class AccountIsNotFoundError extends EntityIsNotFoundError {
  constructor () {
    super('Account')
    this.name = 'AccountIsNotFoundError'
  }
}
