import { EntityAlreadyExistsError } from '@/data/common/errors'

export class EmailInUseError extends EntityAlreadyExistsError {
  constructor () {
    super('The received email is already in use')
    this.name = 'EmailInUseError'
  }
}
