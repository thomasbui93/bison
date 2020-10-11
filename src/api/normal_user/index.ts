import { NextFunction, Request, Response, Router } from 'express'
import { body, validationResult } from 'express-validator'
import createUser from '../../features/regular/create_user'
import { passwordCheck, tokenCheck } from '../../features/regular/authenticate'
import { revokeAllToken } from '../../features/regular/token'
import validateRequest from '../helpers/validators'
import changePassword from '../../features/regular/change_password'

const router = Router()

router.post('/',
  [ body('email').isEmail(), body('password').isLength({min: 6})],
  async (req: Request, res: Response, next: NextFunction) => {
  validateRequest(req, res)
  try {
    const user = await createUser(req.body.email, req.body.password)
    res.status(201).json({
      user
    })
  } catch (err) {
    next(err)
  }
})

router.post('/login',
  [ body('email').isEmail() ],
  async (req: Request, res: Response, next: NextFunction) => {
  validateRequest(req, res)
  try {
    const token = await passwordCheck(req.body.email, req.body.password)
    res.status(200).json({
      token
    })
  } catch (err) {
    next(err)
  }
})

router.post('/verify',
  [ body('token').isJWT() ],
  async (req: Request, res: Response, next: NextFunction) => {
  validateRequest(req, res)
  try {
    const isValid = await tokenCheck(req.body.token)
    res.status(200).json({
      ok: isValid
    })
  } catch (err) {
    next(err)
  }
})

router.post('/logout',
  [ body('email').isEmail() ],
  async (req: Request, res: Response, next: NextFunction) => {
  validateRequest(req, res)
  try {
    const tokens = await revokeAllToken(req.body.email)
    res.status(200).json({
      ok: true,
      tokens
    })
  } catch (err) {
    next(err)
  }
})

router.post('/change-password',
  [ body('email').isEmail(), body('oldPassword').isLength({min: 3}), body('newPassword').isLength({min: 3}) ],
  async (req: Request, res: Response, next: NextFunction) => {
  validateRequest(req, res)
  try {
    await changePassword(req.body.email, req.body.oldPassword, req.body.newPassword)
    res.status(200).json({
      ok: true
    })
  } catch (err) {
    next(err)
  }
})

export default router
