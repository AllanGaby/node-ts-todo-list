export type ExportHtmlToPDFDTO = {
  pdfFilePath: string
  htmlContent: string
}

export interface ExportHtmlToPDF {
  exportToPDF: (params: ExportHtmlToPDFDTO) => Promise<void>
}
