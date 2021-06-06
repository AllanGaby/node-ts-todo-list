import { HtmlTemplateParse, HtmlParseDTO } from '@/data/comunication/protocols'
import handlebars from 'handlebars'
import fs from 'fs'

export class HandlebarsAdapter implements HtmlTemplateParse {
  async parse ({ filePath, variables }: HtmlParseDTO): Promise<string> {
    const templateContent = await fs.promises.readFile(filePath, {
      encoding: 'utf-8'
    })
    const parseTemplate = handlebars.compile(templateContent)
    return parseTemplate(variables)
  }
}
