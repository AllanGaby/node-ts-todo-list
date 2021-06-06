import { HttpRequest, HttpResponse } from './http'

export interface Controller<RequestBody, ResponseBody, RequestHeaders = any, RequestQueryParams = any, RequestParams = any> {
  handle: (request: HttpRequest<RequestBody, RequestHeaders, RequestQueryParams, RequestParams>) => Promise<HttpResponse<ResponseBody>>
}
