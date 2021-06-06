import { ExportHtmlToPDF, ExportToCSV, ExportToXLSX } from '@/data/common/protocols'
import { HtmlToPDFAdapter } from './html-to-pdf-adapter'
import { ExcelJSAdapter } from './exceljs-adapter'

export class ExportDataFactory {
  static makeExportHtmlToPDF = (): ExportHtmlToPDF => new HtmlToPDFAdapter()
  static makeExportToCSV = (): ExportToCSV => new ExcelJSAdapter()
  static makeExportToXLSX = (): ExportToXLSX => new ExcelJSAdapter()
}
