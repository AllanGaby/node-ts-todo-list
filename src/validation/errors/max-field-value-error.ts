import { ValidationError } from './validation-error'

export class MaxFieldValueError extends ValidationError {
  constructor (fieldName: string) {
    super(fieldName, 'field value is bigger than allowed')
  }
}
