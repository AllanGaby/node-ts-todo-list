export interface DeleteUserAccountAvatarUseCase {
  deleteAvatar: (accountId: string) => Promise<void>
}
