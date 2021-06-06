import { UploadUserAccountAvatarUseCase, UploadUserAccountAvatarDTO } from '@/domain/auth'

export class UploadUserAccountAvatarUseCaseSpy implements UploadUserAccountAvatarUseCase {
  params: UploadUserAccountAvatarDTO

  async upload (params: UploadUserAccountAvatarDTO): Promise<void> {
    this.params = params
  }
}
