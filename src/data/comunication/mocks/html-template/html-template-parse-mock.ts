import { HtmlTemplateParse, HtmlParseDTO } from '@/data/comunication/protocols'
import faker from 'faker'

export class HtmlTemplateParseSpy implements HtmlTemplateParse {
  params: HtmlParseDTO
  result: string = faker.random.uuid()

  async parse (params: HtmlParseDTO): Promise<string> {
    this.params = params
    return this.result
  }
}
