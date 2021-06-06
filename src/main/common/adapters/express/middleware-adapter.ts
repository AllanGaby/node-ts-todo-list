import { Middleware, HttpRequest } from '@/presentation/common/protocols'
import { Request, Response, NextFunction } from 'express'

export const middlewareAdapter = (middleware: Middleware<any, any>) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const httpRequest: HttpRequest<any> = {
      headers: request.headers,
      body: request.body
    }
    const httpResponse = await middleware.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      request.body = httpResponse.body
      next()
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
