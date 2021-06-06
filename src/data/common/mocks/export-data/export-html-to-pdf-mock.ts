import { ExportHtmlToPDF, ExportHtmlToPDFDTO } from '@/data/common/protocols'

export class ExportHtmlToPDFSpy implements ExportHtmlToPDF {
  params: ExportHtmlToPDFDTO

  async exportToPDF (params: ExportHtmlToPDFDTO): Promise<void> {
    this.params = params
  }
}
