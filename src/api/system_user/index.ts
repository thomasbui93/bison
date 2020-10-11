import { NextFunction, Request, Response, Router } from 'express'
import removeUser from '../../features/system/remove_user'
import authenticate from '../../features/system/authenticate'
import createUser from '../../features/system/create_user'
import { body } from 'express-validator'
import getSystemUsers from '../../features/system/find_users'
import SystemUserSearchFailed from '../../exceptions/features/system/SystemUserSearchFailed'
import adminAuthentication from '../../middleware/authentication'
import validateRequest from '../helpers/validators';

const router = Router()

router.post('/',
  adminAuthentication,
  [ body('name').isLength({min: 3}) ],
  async (req: Request, res: Response, next: NextFunction) => {
  validateRequest(req, res)
  try {
    const user = await createUser(req.body.name)
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/verify',
  [ body('name').isLength({min: 3}), body('token').isUUID() ],
  async (req: Request, res: Response, next: NextFunction) => {
  validateRequest(req, res)  
  try {
    const token = await authenticate({
      name: req.body.name,
      token: req.body.token,
    })
    res.json({token})
  } catch (err) {
    next(err)
  }
})

router.delete('/:userName',
  adminAuthentication, 
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    await removeUser(req.params.userName)
    res.json({
      status: true
    })
  } catch (err) {
    next(err)
  }
})

router.get('/',
  adminAuthentication,
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page: any = req.query.page
    let size: any = req.query.size
    if (!page) page = 1
    if (!size) size = 10

    if (isNaN(parseInt(page)) || isNaN(parseInt(size))) throw new SystemUserSearchFailed('Invalid search params.')

    const users = await getSystemUsers(parseInt(page), parseInt(size))
    res.json({
      users,
      page,
      size
    })
  } catch (err) {
    next(err)
  }
})


export default router
