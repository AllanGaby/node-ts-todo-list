export type RecoverPasswordDTO = {
  token: string
  password: string
}

export interface RecoverPasswordUseCase {
  recoverPassword: (params: RecoverPasswordDTO) => Promise<void>
}
