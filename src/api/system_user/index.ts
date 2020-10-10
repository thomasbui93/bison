import { NextFunction, Request, Response, Router } from 'express'
import removeUser from '../../features/system/remove_user'
import authenticate from '../../features/system/authenticate'
import createUser from '../../features/system/create_user'
import { body, validationResult } from 'express-validator'
import getSystemUsers from '../../features/system/find_users'
import SystemUserSearchFailed from '../../exceptions/features/system/SystemUserSearchFailed'

const router = Router()

router.post('/',
  [ body('name').isLength({min: 3}) ],
  async (req: Request, res: Response, next: NextFunction) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await createUser(req.body.name)
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/verify', async (req: Request, res: Response, next: NextFunction) => {
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

router.delete('/:userName', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await removeUser(req.params.userName)
    res.json({
      status: true
    })
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page: any = req.query.page
    let size: any = req.query.size
    if (!page) page = 1
    if (!size) size = 10

    const users = await getSystemUsers(parseInt(page) || 1, parseInt(size) || 10)
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
