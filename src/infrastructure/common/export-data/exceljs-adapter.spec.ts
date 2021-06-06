import { ExcelJSAdapter } from './exceljs-adapter'
import { mockExportToSheetFileDTO } from '@/data/common/mocks'
import { SheetSpy } from '@/infrastructure/common/mocks'

type sutTypes = {
  sut: ExcelJSAdapter
}

const makeSut = (): sutTypes => {
  const sut = new ExcelJSAdapter()
  jest.spyOn(sut.workbook.csv, 'writeFile').mockImplementationOnce((path: string) => { return undefined })
  jest.spyOn(sut.workbook.xlsx, 'writeFile').mockImplementationOnce((path: string) => { return undefined })
  return {
    sut
  }
}

describe('ExcelJSAdapter', () => {
  describe('ExportToCSV Method', () => {
    test('Should call AddWorksheet with correct values', async () => {
      const { sut } = makeSut()
      const request = mockExportToSheetFileDTO()
      const addWorksheetSpy = jest.spyOn(sut.workbook, 'addWorksheet')
      await sut.exportToCSV(request)
      expect(addWorksheetSpy).toHaveBeenCalledWith('default')
    })

    test('Should call addRows with correct values', async () => {
      const { sut } = makeSut()
      const request = mockExportToSheetFileDTO()
      const sheetSpy = new SheetSpy()
      jest.spyOn(sut.workbook, 'addWorksheet').mockImplementationOnce((name: string): any => { return sheetSpy })
      const addRowsSpy = jest.spyOn(sheetSpy, 'addRows')
      await sut.exportToCSV(request)
      expect(addRowsSpy).toHaveBeenCalledWith(request.data)
    })

    test('Should call addRows with correct values without columns', async () => {
      const { sut } = makeSut()
      const request = mockExportToSheetFileDTO()
      delete request.columns
      const sheetSpy = new SheetSpy()
      jest.spyOn(sut.workbook, 'addWorksheet').mockImplementationOnce((name: string): any => { return sheetSpy })
      const addRowsSpy = jest.spyOn(sheetSpy, 'addRows')
      await sut.exportToCSV(request)
      expect(addRowsSpy).toHaveBeenCalledWith(request.data)
    })

    test('Should call WriteFile with correct values', async () => {
      const { sut } = makeSut()
      const request = mockExportToSheetFileDTO()
      const writeFileSpy = jest.spyOn(sut.workbook.csv, 'writeFile')
      await sut.exportToCSV(request)
      expect(writeFileSpy).toHaveBeenCalledWith(request.filePath)
    })
  })

  describe('ExportToXLSX Method', () => {
    test('Should call AddWorksheet with correct values', async () => {
      const { sut } = makeSut()
      const request = mockExportToSheetFileDTO()
      const addWorksheetSpy = jest.spyOn(sut.workbook, 'addWorksheet')
      await sut.exportToXLSX(request)
      expect(addWorksheetSpy).toHaveBeenCalledWith('default')
    })

    test('Should call addRows with correct values', async () => {
      const { sut } = makeSut()
      const request = mockExportToSheetFileDTO()
      const sheetSpy = new SheetSpy()
      jest.spyOn(sut.workbook, 'addWorksheet').mockImplementationOnce((name: string): any => { return sheetSpy })
      const addRowsSpy = jest.spyOn(sheetSpy, 'addRows')
      await sut.exportToXLSX(request)
      expect(addRowsSpy).toHaveBeenCalledWith(request.data)
    })

    test('Should call addRows with correct values without columns', async () => {
      const { sut } = makeSut()
      const request = mockExportToSheetFileDTO()
      delete request.columns
      const sheetSpy = new SheetSpy()
      jest.spyOn(sut.workbook, 'addWorksheet').mockImplementationOnce((name: string): any => { return sheetSpy })
      const addRowsSpy = jest.spyOn(sheetSpy, 'addRows')
      await sut.exportToXLSX(request)
      expect(addRowsSpy).toHaveBeenCalledWith(request.data)
    })

    test('Should call WriteFile with correct values', async () => {
      const { sut } = makeSut()
      const request = mockExportToSheetFileDTO()
      const writeFileSpy = jest.spyOn(sut.workbook.xlsx, 'writeFile')
      await sut.exportToXLSX(request)
      expect(writeFileSpy).toHaveBeenCalledWith(request.filePath)
    })
  })
})
