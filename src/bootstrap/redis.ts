import Redis, { Redis as RedisType } from 'ioredis'
import setupConfig from './config'
let redis: RedisType = null

export default function getRedis(): RedisType {
  if (redis !== null) return redis

  setupConfig()
  redis = new Redis(process.env.REDIS_URL)
  return redis
}
