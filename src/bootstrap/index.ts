import dataSync from './data_sync';
import getSequelize from './sequelize';
import setupServer, { afterStartup } from './server';

export default async function bootstrap() {
  getSequelize()
  await dataSync()
  const app = setupServer()
  const port = process.env.PORT || 3000
  app.listen(port, () => {
    afterStartup(port)
  })
}
