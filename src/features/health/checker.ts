import getSequelize from '../../bootstrap/sequelize'
import getRedis from '../../bootstrap/redis'

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
    return {
      name: 'sql',
      status: false
    }
  }
}
