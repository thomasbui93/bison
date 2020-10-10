import { Express } from 'express'
import systemUserController from './system_user'
import normalUserController from './normal_user'

export default function routes(app: Express) {
  app.use('/api/system-user', systemUserController)
  app.use('/api/normal-user', normalUserController)
}
