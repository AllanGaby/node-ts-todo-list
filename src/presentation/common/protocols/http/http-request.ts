export interface HttpRequest<BodyType = any, HeadersType = any, RequestQueryParams = object, RequestParams = any> {
  body?: BodyType
  params?: RequestParams
  headers?: HeadersType
  fileName?: string
  queryParams?: RequestQueryParams
}
