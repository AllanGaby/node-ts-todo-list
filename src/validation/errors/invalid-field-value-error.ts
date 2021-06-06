import { ValidationError } from './validation-error'

export class InvalidFieldValueError extends ValidationError {
  constructor (fieldName: string) {
    super(fieldName, 'invalid value')
  }
}
