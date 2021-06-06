import { ValidationError } from './validation-error'

export class MinFieldValueError extends ValidationError {
  constructor (fieldName: string) {
    super(fieldName, 'field value is smaller than allowed')
  }
}
