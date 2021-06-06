import multer, { Multer } from 'multer'
import { v4 } from 'uuid'

export const multerSetup = (temporaryDir: string): Multer => {
  return multer({
    storage: multer.diskStorage({
      destination: temporaryDir,
      filename (request, file, callback) {
        return callback(null, `${v4()}-${file.originalname}`)
      }
    })
  })
}
