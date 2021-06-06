import { FileInfo } from 'html-pdf'

export class PDFCreatorSpy {
  pdfFilePath: string
  callback: (err: Error, res: FileInfo) => void

  toFile (pdfFilePath: string, callback: (err: Error, res: FileInfo) => void): void {
    this.pdfFilePath = pdfFilePath
    this.callback = callback
  }
}
