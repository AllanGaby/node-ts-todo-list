export type UploadUserAccountAvatarDTO = {
  avatar_path: string
  account_id: string
}

export interface UploadUserAccountAvatarUseCase {
  upload: (params: UploadUserAccountAvatarDTO) => Promise<void>
}
