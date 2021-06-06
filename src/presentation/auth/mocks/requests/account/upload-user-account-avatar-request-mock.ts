import { UserAccountIdParamsRequest, UploadUserAccountAvatarRequest } from '@/presentation/auth/requests'
import { mockUserAccountIdParamsRequest } from '@/presentation/auth/mocks'
import { HttpRequest } from '@/presentation/common/protocols'
import faker from 'faker'

export const mockUploadUserAccountAvatarRequest = (): HttpRequest<UploadUserAccountAvatarRequest, any, any, UserAccountIdParamsRequest> => ({
  ...mockUserAccountIdParamsRequest(),
  body: {
    avatar_path: faker.system.filePath()
  }
})
