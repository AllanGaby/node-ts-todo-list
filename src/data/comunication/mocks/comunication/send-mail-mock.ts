import { SendMail, SendMailDTO } from '@/data/comunication/protocols'

export class SendMailSpy implements SendMail {
  params: SendMailDTO

  async sendMail (params: SendMailDTO): Promise<void> {
    this.params = params
  }
}
