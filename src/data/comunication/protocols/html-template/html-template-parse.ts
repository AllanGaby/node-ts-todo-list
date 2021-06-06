import { HtmlTemplateVariables } from '@/domain/comunication'

export interface HtmlParseDTO {
  variables: HtmlTemplateVariables
  filePath: string
}

export interface HtmlTemplateParse {
  parse: (data: HtmlParseDTO) => Promise<string>
}
