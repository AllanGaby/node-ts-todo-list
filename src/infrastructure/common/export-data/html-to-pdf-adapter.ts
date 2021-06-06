import { ExportHtmlToPDF, ExportHtmlToPDFDTO } from '@/data/common/protocols'
import pdf from 'html-pdf'

export class HtmlToPDFAdapter implements ExportHtmlToPDF {
  async exportToPDF ({ pdfFilePath, htmlContent }: ExportHtmlToPDFDTO): Promise<void> {
    const pdfCreator = pdf.create(htmlContent, {
      format: 'A4'
    })
    /* istanbul ignore next */
    pdfCreator.toFile(pdfFilePath, () => {})
  }
}
