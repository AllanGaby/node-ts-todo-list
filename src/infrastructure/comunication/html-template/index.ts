import { HtmlTemplateParse } from '@/data/comunication/protocols'
import { HandlebarsAdapter } from './handlebars-adapter'

export class HtmlTemplateFactory {
  static makeHtmlTemplateParse = (): HtmlTemplateParse => new HandlebarsAdapter()
}
