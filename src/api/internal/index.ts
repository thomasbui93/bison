import validateRequest from '../helpers/validators';
import { NextFunction, Request, Response, Router } from 'express'
import { body } from 'express-validator';
import { bulkDeactivate, deactivate } from '../../features/regular/deactivate';

const router = Router()

router.post('/normal-user/deactivate',
  [ body('email').isEmail() ],
  async (req: Request, res: Response, next: NextFunction) => {
  validateRequest(req, res)
  try {
    await deactivate(req.body.email)
    res.status(201).json({
      ok: true
    })
  } catch (err) {
    next(err)
  } 
})

router.post('/normal-user/bulk/deactivate',
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const affected = await bulkDeactivate(req.body.emails)
    res.status(201).json({
      affected
    })
  } catch (err) {
    next(err)
  } 
})


export default router
