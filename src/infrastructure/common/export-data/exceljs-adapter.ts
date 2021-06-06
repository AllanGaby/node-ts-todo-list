import { ExportToCSV, ExportToXLSX, ExportToSheetFileDTO } from '@/data/common/protocols'
import { Workbook } from 'exceljs'

export class ExcelJSAdapter implements ExportToCSV, ExportToXLSX {
  workbook: Workbook
  constructor () {
    this.workbook = new Workbook()
  }

  private createDefaultSheet <random = object>({ columns, data }: ExportToSheetFileDTO<random>): void {
    this.workbook.removeWorksheet('default')
    const sheet = this.workbook.addWorksheet('default')
    if (columns) {
      sheet.columns = columns
    }
    sheet.addRows(data)
  }

  async exportToCSV <random = object>(params: ExportToSheetFileDTO<random>): Promise<void> {
    this.createDefaultSheet(params)
    this.workbook.csv.writeFile(params.filePath)
  }

  async exportToXLSX <random = object>(params: ExportToSheetFileDTO<random>): Promise<void> {
    this.createDefaultSheet(params)
    this.workbook.xlsx.writeFile(params.filePath)
  }
}
