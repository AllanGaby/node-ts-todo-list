import { CreateUserAccountDTO } from '@/domain/auth'

export interface CreateUserAccountAndSendMailUseCase {
  create: (params: CreateUserAccountDTO) => Promise<void>
}
