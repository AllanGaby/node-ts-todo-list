import faker from 'faker'

export class HandlebarsSpy {
  static result: string = faker.random.uuid()

  static parseTemplate (variables: any): any {
    return HandlebarsSpy.result
  }
}
