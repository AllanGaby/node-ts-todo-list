import { ValidationError } from './validation-error'

export class MaxLengthFieldError extends ValidationError {
  constructor (fieldName: string) {
    super(fieldName, 'length value is bigger than allowed')
  }
}
