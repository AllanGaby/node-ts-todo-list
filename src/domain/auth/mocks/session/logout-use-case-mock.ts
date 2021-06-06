import { LogoutUseCase } from '@/domain/auth'

export class LogoutUseCaseSpy implements LogoutUseCase {
  sessionId: string

  async logout (sessionId: string): Promise<void> {
    this.sessionId = sessionId
  }
}
