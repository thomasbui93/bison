import { Express } from 'express'
import systemUserController from './system_user'
import normalUserController from './normal_user'
import internalController from './internal'
import healthCheckController from './heath_check'
import adminAuthentication from '../middleware/authentication'

export default function routes(app: Express) {
  app.use('/api/system-user', systemUserController)
  app.use('/api/normal-user', normalUserController)
  app.use('/z/ping', healthCheckController)
  app.use('/internal', adminAuthentication, internalController)
}
