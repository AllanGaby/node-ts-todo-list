import { mockExportHtmlToPDFDTO } from '@/data/common/mocks'
import { HtmlToPDFAdapter } from './html-to-pdf-adapter'
import { PDFCreatorSpy } from '@/infrastructure/common/mocks'
import pdf from 'html-pdf'

const PDFCreator = new PDFCreatorSpy()

jest.mock('html-pdf', () => ({
  create: () => { return PDFCreator }
}))

type sutTypes = {
  sut: HtmlToPDFAdapter
}

const makeSut = (): sutTypes => ({
  sut: new HtmlToPDFAdapter()
})

describe('HtmlToPDFAdapter', () => {
  test('Should call Create with correct values', async () => {
    const { sut } = makeSut()
    const request = mockExportHtmlToPDFDTO()
    const createSpy = jest.spyOn(pdf, 'create')
    await sut.exportToPDF(request)
    expect(createSpy).toHaveBeenCalledWith(request.htmlContent, {
      format: 'A4'
    })
  })

  test('Should call toFile with correct values', async () => {
    const { sut } = makeSut()
    const request = mockExportHtmlToPDFDTO()
    const toFileSpy = jest.spyOn(PDFCreator, 'toFile')
    await sut.exportToPDF(request)
    expect(toFileSpy).toHaveBeenCalled()
    expect(PDFCreator.pdfFilePath).toBe(request.pdfFilePath)
  })
})
