import { NextFunction, Request, Response, Router } from "express"
import authenticate from "../../features/system/authenticate"
import createUser from "../../features/system/create_user"

const router = Router()

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const user = await createUser(req.body.name)
  try {
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/verify', async (req: Request, res: Response, next: NextFunction) => {
  const token = await authenticate({
    name: req.body.name,
    token: req.body.token,
  })
  try {
    res.json({token})
  } catch (err) {
    next(err)
  }
})

export default router
