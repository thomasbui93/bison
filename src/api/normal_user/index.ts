import { NextFunction, Request, Response, Router } from 'express'
import { body, validationResult } from 'express-validator'
import createUser from '../../features/regular/create_user'
import { passwordCheck, tokenCheck } from '../../features/regular/authenticate'
import { revokeAllToken } from '../../features/regular/token'

const router = Router()

router.post('/',
  [ body('email').isEmail(), body('password').isLength({min: 6})],
  async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

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

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const token = await passwordCheck(req.body.email, req.body.password)
    res.status(200).json({
      token
    })
  } catch (err) {
    next(err)
  }
})

router.post('/verify', async (req: Request, res: Response, next: NextFunction) => {

  try {
    const isValid = await tokenCheck(req.body.token)
    res.status(200).json({
      ok: isValid
    })
  } catch (err) {
    next(err)
  }
})

router.post('/logout', async (req: Request, res: Response, next: NextFunction) => {

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

export default router
