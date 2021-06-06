import { RecoverPasswordUseCase, RecoverPasswordDTO } from '@/domain/auth'

export class RecoverPasswordUseCaseSpy implements RecoverPasswordUseCase {
  params: RecoverPasswordDTO

  async recoverPassword (params: RecoverPasswordDTO): Promise<void> {
    this.params = params
  }
}
