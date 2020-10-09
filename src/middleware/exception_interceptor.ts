import { NextFunction, Request, Response } from 'express'

const getStatus = (err: Error): number => {
  switch (err.name) {
    case 'SystemUserCreateException':
    case 'SystemUserRemovalException':
      return 400
    case 'SystemUserAuthenticationFailed': 
      return 401
    default:
      return 500
  }
}

export default function exceptionInterceptor(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err)
  }

  console.error('Uncaught exception', {
    request: req.url,
    method: req.method,
    body: req.body,
    stack: err.stack,
  })

  return res.status(getStatus(err)).send({
    error: true,
    message: err.message,
  })
}
