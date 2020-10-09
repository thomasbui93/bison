import { NextFunction, Request, Response } from "express"

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
  console.log(err)

  return res.status(500).send({
    error: true,
    message: err.message,
  })
}
