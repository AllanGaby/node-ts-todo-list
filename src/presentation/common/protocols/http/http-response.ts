export interface HttpResponse<BodyType = any> {
  statusCode: number
  body: BodyType
  filePath?: string
}
