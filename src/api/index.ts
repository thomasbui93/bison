import { Express } from 'express'
import systemUserController from './system_user'

export default function routes(app: Express) {
  app.use('/api/system-user', systemUserController)
}
