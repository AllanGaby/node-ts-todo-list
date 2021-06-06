export class PipelineSpy {
  keys: string[]

  constructor () {
    this.keys = []
  }

  del (key: string): void {
    this.keys.push(key)
  }

  exec (): void {
    return undefined
  }
}
