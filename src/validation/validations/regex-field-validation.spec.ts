import { RegexFieldValidation } from './regex-field-validation'
import { addFieldValue, mockFieldUndefined } from '@/validation/mocks'
import { InvalidFieldValueError } from '@/validation/errors'
import faker from 'faker'

type sutTypes = {
  sut: RegexFieldValidation
  field: string
}

const makeSut = (regex: RegExp): sutTypes => {
  const field = faker.random.uuid()
  const sut = new RegexFieldValidation(field, regex)
  return {
    sut,
    field
  }
}

describe('RegexFieldValidation', () => {
  test('Should return undefied if field value match to regex', () => {
    const { sut, field } = makeSut(/\d/g)
    const validation = sut.validate(addFieldValue({}, field, faker.random.number()))
    expect(validation).toBeFalsy()
  })

  test('Should return undefied if field value is not provide', () => {
    const { sut, field } = makeSut(/\d/g)
    const validation = sut.validate(mockFieldUndefined(field))
    expect(validation).toBeFalsy()
  })

  test('Should return InvalidFieldValueError if field value no match to regex', () => {
    const { sut, field } = makeSut(/\d/g)
    const validation = sut.validate(addFieldValue({}, field, faker.random.alpha()))
    expect(validation).toEqual(new InvalidFieldValueError(field))
  })
})
