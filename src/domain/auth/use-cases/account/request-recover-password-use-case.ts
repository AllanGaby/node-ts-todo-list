export interface RequestRecoverPasswordUseCase {
  request: (email: string) => Promise<void>
}
