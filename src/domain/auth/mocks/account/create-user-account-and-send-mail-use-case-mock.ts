import { CreateUserAccountAndSendMailUseCase, CreateUserAccountDTO } from '@/domain/auth'

export class CreateUserAccountAndSendMailUseCaseSpy implements CreateUserAccountAndSendMailUseCase {
  params: CreateUserAccountDTO

  async create (params: CreateUserAccountDTO): Promise<void> {
    this.params = params
  }
}
