import { MaxLengthValidation } from './max-length-validation'
import { mockFieldValue, mockFieldUndefined } from '@/validation/mocks'
import { MaxLengthFieldError } from '@/validation/errors'
import faker from 'faker'

type sutTypes = {
  sut: MaxLengthValidation
  field: string
  maxLength: number
}

const makeSut = (): sutTypes => {
  const field = faker.random.uuid()
  const maxLength = faker.random.number({ min: 1, max: 20 })
  const sut = new MaxLengthValidation(field, maxLength)
  return {
    sut,
    field,
    maxLength
  }
}

describe('MaxLengthValidation', () => {
  test('Should return undefined if value length is smaller than maxLength', () => {
    const { sut, field, maxLength } = makeSut()
    const validation = sut.validate(mockFieldValue(field, maxLength - 1))
    expect(validation).toBeFalsy()
  })

  test('Should return undefined if value length igual to minLength', () => {
    const { sut, field, maxLength } = makeSut()
    const validation = sut.validate(mockFieldValue(field, maxLength))
    expect(validation).toBeFalsy()
  })

  test('Should return undefined if value is not provide', () => {
    const { sut, field } = makeSut()
    const validation = sut.validate(mockFieldUndefined(field))
    expect(validation).toBeFalsy()
  })

  test('Should return MinLengthFieldError if value length is bigger than maxLength', () => {
    const { sut, field, maxLength } = makeSut()
    const validation = sut.validate(mockFieldValue(field, maxLength + 1))
    expect(validation).toEqual(new MaxLengthFieldError(field))
  })
})
