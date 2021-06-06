import { ValidationError } from './validation-error'

export class MinLengthFieldError extends ValidationError {
  constructor (fieldName: string) {
    super(fieldName, 'length value is smaller than allowed')
  }
}
