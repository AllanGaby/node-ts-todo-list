export interface LogoutUseCase {
  logout: (sessionId: string) => Promise<void>
}
