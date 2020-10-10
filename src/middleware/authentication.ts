import AdminAuthenticationFailure from '../exceptions/features/internal/AdminAuthenticationFailure'
import { NextFunction, Request, Response } from 'express'

export default function adminAuthentication(req: Request, res: Response, next: NextFunction) {
  if (!req.headers['secret']) return next(new AdminAuthenticationFailure('Missing secret.'))

  if (req.headers['secret'] !== process.env.SECRET) return next(new AdminAuthenticationFailure('Invalid secret.'))

  next()
}
