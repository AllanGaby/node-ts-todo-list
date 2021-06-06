import { Controller, HttpRequest } from '@/presentation/common/protocols'
import { Request, Response } from 'express'
import fs from 'fs'

export const routeAdapter = <RequestBody = any, ResponseBody = any>(controller: Controller<RequestBody, ResponseBody | Error>, fileFieldName: string = 'file') => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest<RequestBody> = {
      body: request.body,
      params: request.params,
      headers: request.headers,
      queryParams: request.query
    }

    if (request.file) {
      request.body[fileFieldName] = request.file.filename
    }

    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      if (httpResponse.filePath) {
        const extension = httpResponse.filePath.toLocaleLowerCase().split('.').pop()
        switch (extension) {
          case 'csv':
            response.contentType('text/csv')
            await fs.promises.readFile(httpResponse.filePath)
            break
          case 'jpg':
            response.contentType('image/jpeg')
            break
          case 'jpeg':
            response.contentType('image/jpeg')
            break
          case 'png':
            response.contentType('image/png')
            break
          case 'pdf':
            response.contentType('application/pdf')
            break
          case 'xls':
            response.contentType('application/vnd.ms-excel')
            break
          case 'xlsx':
            response.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            break
          default:
            response.contentType('application/json')
        }
        response.sendFile(httpResponse.filePath)
      } else {
        response.status(httpResponse.statusCode).json(httpResponse.body)
      }
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.body
      })
    }
    return response
  }
}
