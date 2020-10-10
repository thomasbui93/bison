import { config, DotenvConfigOutput } from 'dotenv'
import InvalidConfiguration from '../exceptions/bootstrap/InvalidConfiguration'

let output: DotenvConfigOutput

export default function setupConfig(): void {
  if (typeof output !== 'undefined') return
  output = config()
  const requiredKeys = ['DB_CONNECTION_URL', 'REDIS_URL', 'SALT_ROUNDS', 'JWT_SECRET']
  requiredKeys.forEach(key => {
    if (!process.env[key]) {
      throw new InvalidConfiguration(`Missing ${key} environment variable.`)
    }
  })
}
