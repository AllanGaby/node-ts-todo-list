import { UploadStorageFile, UploadStorageFileDTO, DeleteStorageFile, DeleteStorageFileDTO } from '@/data/common/protocols'
import fs from 'fs'
import path from 'path'

export interface LocalStorageConfig {
  temporaryDir: string
  uploadDir: string
}

export class LocalStorageAdapter implements UploadStorageFile, DeleteStorageFile {
  constructor (private readonly config: LocalStorageConfig) {}

  async upload ({ sourceFile, destinationFile }: UploadStorageFileDTO): Promise<boolean> {
    const sourceFilePath = path.resolve(this.config.temporaryDir, sourceFile)
    await fs.promises.rename(sourceFilePath, destinationFile)
    return true
  }

  async delete ({ filePath }: DeleteStorageFileDTO): Promise<void> {
    await fs.promises.unlink(filePath)
  }
}
