import getSequelize from '../../bootstrap/sequelize'
import getRedis from '../../bootstrap/redis'
import logger from '../../helpers/logger'

const log = logger.child({
  name: 'healthCheck'
})

export default async function healthCheck(): Promise<HealthComponent[]> {
  return Promise.all([checkDatabase(), checkRedis()])
}

type HealthComponent = {
  name: string,
  status: boolean
}

async function checkRedis(): Promise<HealthComponent> {
  try {
    const pong = await getRedis().ping()
    return {
      name: 'redis',
      status: pong === 'PONG'
    }
  } catch (err) {
    log.error(`Failed to connect to Redis instance: ${err.message}`)

    return {
      name: 'redis',
      status: false
    }
  }
}

async function checkDatabase(): Promise<HealthComponent> {
  try {
    const sequelize = await getSequelize()
    await sequelize.authenticate()
    return {
      name: 'sql',
      status: true
    }
  } catch (err) {
    log.error(`Failed to connect to SQL instance: ${err.message}`)
    return {
      name: 'sql',
      status: false
    }
  }
}
