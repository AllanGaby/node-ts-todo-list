import { LocalStorageAdapter } from './local-storage-adapter'
import fs from 'fs'
import path from 'path'
import faker from 'faker'

interface sutTypes {
  sut: LocalStorageAdapter
  destinationFilePath: string
  sourceFilePath: string
}
const uploadDir = 'uploads'
const defaultFilePath = `${uploadDir}/test.jpg`
const testFileName = `${faker.random.uuid()}.jpg`
const testFilePath = path.resolve(uploadDir, testFileName)
const destinationFilePath = `${faker.random.uuid()}.jpg`

const makeSut = (): sutTypes => ({
  sut: new LocalStorageAdapter({
    temporaryDir: uploadDir,
    uploadDir
  }),
  destinationFilePath,
  sourceFilePath: testFilePath
})

describe('LocalStorageAdapter', () => {
  describe('Upload Method', () => {
    beforeEach(async () => {
      await fs.promises.copyFile(defaultFilePath, testFilePath)
    })

    afterEach(async () => {
      await fs.promises.unlink(destinationFilePath)
    })

    afterAll(async () => {
      await fs.promises.unlink(testFilePath)
    })

    test('Should call rename with correct values', async () => {
      const { sut, destinationFilePath, sourceFilePath } = makeSut()
      const renameSpy = jest.spyOn(fs.promises, 'rename')
      await sut.upload({
        sourceFile: testFileName,
        destinationFile: destinationFilePath
      })
      expect(renameSpy).toHaveBeenCalledWith(sourceFilePath, destinationFilePath)
    })
  })

  describe('Delete Method', () => {
    beforeEach(async () => {
      await fs.promises.copyFile(defaultFilePath, testFilePath)
    })

    test('Should call unlink with correct values', async () => {
      const { sut } = makeSut()
      expect(fs.existsSync(testFilePath)).toBeTruthy()
      await sut.delete({
        filePath: testFilePath
      })
      expect(fs.existsSync(testFilePath)).toBeFalsy()
    })
  })
})
