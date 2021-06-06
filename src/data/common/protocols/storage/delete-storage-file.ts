export interface DeleteStorageFileDTO {
  filePath: string
}

export interface DeleteStorageFile {
  delete: (data: DeleteStorageFileDTO) => Promise<void>
}
