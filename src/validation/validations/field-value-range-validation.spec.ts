import { FieldValueRangeValidation, RangeOptions } from './field-value-range-validation'
import { mockFieldUndefined, mockRangeOptions, mockRangeValue, addFieldValue } from '@/validation/mocks'
import { MinFieldValueError, MaxFieldValueError } from '@/validation/errors'
import faker from 'faker'

type sutTypes = {
  sut: FieldValueRangeValidation
  field: string
  options: RangeOptions
}

const makeSut = (options: RangeOptions = mockRangeOptions()): sutTypes => {
  const field = faker.random.uuid()
  const sut = new FieldValueRangeValidation(field, options)
  return {
    sut,
    field,
    options
  }
}

describe('FieldValueRangeValidation', () => {
  test('Should return undefined if value is between min and max values', () => {
    const { sut, options, field } = makeSut()
    const validations = sut.validate(mockRangeValue(field, options))
    expect(validations).toBeFalsy()
  })

  test('Should return undefined if min and max values is undefined', () => {
    const { sut, field, options } = makeSut({})
    const validations = sut.validate(mockRangeValue(field, options))
    expect(validations).toBeFalsy()
  })

  test('Should return undefined if value is undefined', () => {
    const { sut, field } = makeSut()
    const validations = sut.validate(mockFieldUndefined(field))
    expect(validations).toBeFalsy()
  })

  test('Should return undefined if value is equal to min value', () => {
    const { sut, field, options } = makeSut()
    const validations = sut.validate(addFieldValue({}, field, options.min))
    expect(validations).toBeFalsy()
  })

  test('Should return undefined if value is equal to max value', () => {
    const { sut, field, options } = makeSut()
    const validations = sut.validate(addFieldValue({}, field, options.max))
    expect(validations).toBeFalsy()
  })

  test('Should return MinFieldValueError if value is smaller than min value allowed', () => {
    const { sut, field } = makeSut()
    const validations = sut.validate(mockRangeValue(field, { min: -20, max: -11 }))
    expect(validations).toEqual(new MinFieldValueError(field))
  })

  test('Should return MaxFieldValueError if value is bigger than max value allowed', () => {
    const { sut, field } = makeSut()
    const validations = sut.validate(mockRangeValue(field, { min: 11, max: 20 }))
    expect(validations).toEqual(new MaxFieldValueError(field))
  })
})
