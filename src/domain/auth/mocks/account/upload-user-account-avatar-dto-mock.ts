import { UploadUserAccountAvatarDTO } from '@/domain/auth'
import faker from 'faker'

export const mockUploadUserAccountAvatarDTO = (): UploadUserAccountAvatarDTO => ({
  account_id: faker.random.uuid(),
  avatar_path: faker.system.filePath()
})
