export type SendActiveAccountMailDTO = {
  subject: string
  accountId: string
  name: string
  email: string
}

export interface SendActiveAccountMailUseCase {
  sendMail: (params: SendActiveAccountMailDTO) => Promise<void>
}
