import { SendActiveAccountMailUseCase, SendActiveAccountMailDTO } from '@/domain/auth'

export class SendActiveAccountMailUseCaseSpy implements SendActiveAccountMailUseCase {
  params: SendActiveAccountMailDTO

  async sendMail (params: SendActiveAccountMailDTO): Promise<void> {
    this.params = params
  }
}
