import { HttpRequest, HttpResponse } from '@/presentation/common/protocols/http'

export interface Middleware<RequestBody, ResponseBody> {
  handle: (request: HttpRequest<RequestBody>) => Promise<HttpResponse<ResponseBody>>
}
