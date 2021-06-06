import { RequestRecoverPasswordUseCase } from '@/domain/auth'

export class RequestRecoverPasswordUseCaseSpy implements RequestRecoverPasswordUseCase {
  email: string

  async request (email: string): Promise<void> {
    this.email = email
  }
}
