import { MinLengthValidation } from './min-length-validation'
import { mockFieldValue, mockFieldUndefined } from '@/validation/mocks'
import { MinLengthFieldError } from '@/validation/errors'
import faker from 'faker'

type sutTypes = {
  sut: MinLengthValidation
  field: string
  minLength: number
}

const makeSut = (): sutTypes => {
  const field = faker.random.uuid()
  const minLength = faker.random.number({ min: 1, max: 20 })
  const sut = new MinLengthValidation(field, minLength)
  return {
    sut,
    field,
    minLength
  }
}

describe('MinLengthValidation', () => {
  test('Should return undefined if value length is larger than minLength', () => {
    const { sut, field, minLength } = makeSut()
    const validation = sut.validate(mockFieldValue(field, minLength + 1))
    expect(validation).toBeFalsy()
  })

  test('Should return undefined if value length igual to minLength', () => {
    const { sut, field, minLength } = makeSut()
    const validation = sut.validate(mockFieldValue(field, minLength))
    expect(validation).toBeFalsy()
  })

  test('Should return undefined if value is not provide', () => {
    const { sut, field } = makeSut()
    const validation = sut.validate(mockFieldUndefined(field))
    expect(validation).toBeFalsy()
  })

  test('Should return MinLengthFieldError if value length is smaller than minLength', () => {
    const { sut, field, minLength } = makeSut()
    const validation = sut.validate(mockFieldValue(field, minLength - 1))
    expect(validation).toEqual(new MinLengthFieldError(field))
  })
})
