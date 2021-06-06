import { HtmlParseDTO } from '@/data/comunication/protocols'
import faker from 'faker'

export const mockHtmlParseDTO = (): HtmlParseDTO => ({
  filePath: faker.system.filePath(),
  variables: {
    [faker.random.uuid()]: faker.random.uuid()
  }
})
