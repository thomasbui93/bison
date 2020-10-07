import express, { Express } from 'express'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression'
import routes from '../api'
import dataSync from './data_sync'

export function afterStartup(port: any) {
  console.log(`The application has started on port: ${port}`)
  dataSync()
}

export default function setupServer(postStartup: (port: any) => void) {
  const app: Express = express()
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())
  app.use(cors())
  app.use(compression({
    level: 9
  }))
  routes(app)
  const port = process.env.PORT || 3000

  app.listen(port, () => {
    postStartup(port)
  })
}
