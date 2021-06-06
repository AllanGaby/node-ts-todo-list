import { AccessTokenModel } from '@/domain/auth'

export type LoginDTO = {
  email: string
  password: string
}

export interface LoginUseCase {
  login: (params: LoginDTO) => Promise<AccessTokenModel>
}
