import { NextFunction, Request, Response } from 'express'
import logger from '../helpers/logger'
import createAudit from '../features/audit/create_audit'
import { SYSTEM_USER, NORMAL_USER, LOGGED_IN, TOKEN_VERIFIED, ADMIN_USER, PASSWORD_CHANGED } from '../features/audit/Audit'

const log = logger.child({
  name: 'exceptionInterceptor'
})

const getStatus = (err: Error): number => {
  switch (err.name) {
    case 'SystemUserCreateException':
    case 'SystemUserRemovalException':
    case 'SystemUserSearchFailed':
    case 'DeactivateUserFailure':
      return 400
    case 'SystemUserAuthenticationFailed':
    case 'NormalUserAuthenticationFailed':
    case 'TokenAuthenticationException':
    case 'AdminAuthenticationFailure':
    case 'ChangePasswordFailure':
      return 401
    default:
      return 500
  }
}

const createAuditLog = (err: Error, req: Request) => {
  switch (err.name) {
    case 'SystemUserAuthenticationFailed':
      return createAudit(req.body.name, SYSTEM_USER, req.ip, LOGGED_IN, false);
    case 'NormalUserAuthenticationFailed':
      return createAudit(req.body.email, NORMAL_USER, req.ip, LOGGED_IN, false);
    case 'TokenAuthenticationException':
      return createAudit(req.body.token, NORMAL_USER, req.ip, TOKEN_VERIFIED, false);
    case 'AdminAuthenticationFailure':
      return createAudit(ADMIN_USER, ADMIN_USER, req.ip, LOGGED_IN, false);
    case 'ChangePasswordFailure':
      return createAudit(req.body.email, NORMAL_USER, req.ip, PASSWORD_CHANGED, false);
    default:
      return null
  }
}

export default async function exceptionInterceptor(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err)
  }
  try {
    await createAuditLog(err, req)
  } catch(err) {
    log.error({
      request: req.url,
      method: req.method,
      body: req.body,
      stack: err.stack,
    }, 'Failed to create audit log when exception is thrown.')
  }

  log.error({
    request: req.url,
    method: req.method,
    body: req.body,
    stack: err.stack,
  }, 'Uncaught exception.')

  return res.status(getStatus(err)).send({
    error: true,
    message: err.message,
  })
}
