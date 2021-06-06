import { HandlebarsAdapter } from './handlebars-adapter'
import { mockHtmlParseDTO } from '@/data/comunication/mocks'
import { HandlebarsSpy } from '@/infrastructure/comunication/mocks'
import handlebars from 'handlebars'
import faker from 'faker'
import fs from 'fs'

type sutTypes = {
  sut: HandlebarsAdapter
}

const fileContent = faker.random.uuid()

const makeSut = (): sutTypes => ({
  sut: new HandlebarsAdapter()
})

describe('HandlebarsAdapter', () => {
  beforeEach(() => {
    jest.spyOn(fs.promises, 'readFile').mockImplementationOnce(async (): Promise<string> => { return fileContent })
  })

  test('Should read correct file', async () => {
    const { sut } = makeSut()
    const readFileSpy = jest.spyOn(fs.promises, 'readFile')
    const request = mockHtmlParseDTO()
    await sut.parse(request)
    expect(readFileSpy).toHaveBeenCalledWith(request.filePath, {
      encoding: 'utf-8'
    })
  })

  test('Should call Handlebars Compile with correct value', async () => {
    const { sut } = makeSut()
    const compileSpy = jest.spyOn(handlebars, 'compile')
    await sut.parse(mockHtmlParseDTO())
    expect(compileSpy).toHaveBeenCalledWith(fileContent)
  })

  test('Should call parseTemplate to Handlebars with correct value', async () => {
    const { sut } = makeSut()
    jest.spyOn(handlebars, 'compile').mockImplementationOnce(() => { return HandlebarsSpy.parseTemplate })
    const parseTemplateSpy = jest.spyOn(HandlebarsSpy, 'parseTemplate')
    const request = mockHtmlParseDTO()
    await sut.parse(request)
    expect(parseTemplateSpy).toHaveBeenCalledWith(request.variables)
  })

  test('Should return same parseTemplate to Handlebars returns if succeeds', async () => {
    const { sut } = makeSut()
    jest.spyOn(handlebars, 'compile').mockImplementationOnce(() => { return HandlebarsSpy.parseTemplate })
    const result = await sut.parse(mockHtmlParseDTO())
    expect(result).toBe(HandlebarsSpy.result)
  })
})
