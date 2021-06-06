import { ContactModel } from '@/domain/comunication'

export interface SendMailDTO {
  sender: ContactModel
  to: ContactModel
  subject: string
  content: string
}

export interface SendMail {
  sendMail: (data: SendMailDTO) => Promise<void>
}
