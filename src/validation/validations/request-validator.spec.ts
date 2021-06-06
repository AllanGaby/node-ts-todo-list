import { RequestValidator } from './request-validator'
import { ValidationBuilder } from './'
import faker from 'faker'
import { mockFieldUndefined, mockFieldValue } from '../mocks'
import { FieldValueRequiredError } from '../errors'

type sutTypes = {
  sut: RequestValidator
  field: string
}

const makeSut = (): sutTypes => ({
  sut: new RequestValidator(),
  field: faker.random.uuid()
})

describe('RequestValidator', () => {
  describe('Field Method', () => {
    test('Should create new ValidatitionBuilder with field name provide', () => {
      const { sut, field } = makeSut()
      const fieldSpy = jest.spyOn(ValidationBuilder, 'field')
      sut.field(field)
      expect(fieldSpy).toHaveBeenCalledWith(field)
    })
  })

  describe('Validate Method', () => {
    test('Should return undefined if all validations is succeeds', () => {
      const { sut, field } = makeSut()
      sut.field(field).required()
      const validations = sut.validate(mockFieldValue(field))
      expect(validations).toBeFalsy()
    })

    test('Should return a list of fields validations if some validation is fails', () => {
      const { sut, field } = makeSut()
      sut.field(field).required()
      const validations = sut.validate(mockFieldUndefined(field))
      expect(validations).toEqual({
        [field]: new FieldValueRequiredError(field).message
      })
    })
  })
})
