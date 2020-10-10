import getRedis from '../../bootstrap/redis'
import { sign, verify } from 'jsonwebtoken'
import TokenCreationFailureException from '../../exceptions/features/regular/TokenCreationFailureException'
import TokenAuthenticationException from '../../exceptions/features/regular/TokenAuthenticationException'
import TokenRevokeFailureException from '../../exceptions/features/regular/TokenRevokeFailureException'

type TokenPayload = {
  email: string
}

const redis = getRedis()

export function encodeNamespace(email: string, token: string) {
  return `token__${email}__${token}`
}

export async function createToken(email: string) {
  try {
    const token = await sign({
      email
    }, process.env.JWT_SECRET)
    const namespace = encodeNamespace(email, token)
    const reply = await redis.set(namespace, 1, 'EX', 15 * 60)

    if (!reply) throw new TokenCreationFailureException('Corrupted redis key.')

    return token
  } catch (err) {
    throw new TokenCreationFailureException(`Failed to create token: ${err.message}`)
  }
}

export async function isValidToken(token: string) {
  try {
    const payload = await verify(token, process.env.JWT_SECRET)
    if (typeof payload !== 'object') return false
    
    const email = (payload as TokenPayload).email
    const namespace = encodeNamespace(email, token)
  
    const fetchedToken = await redis.get(namespace)
    if (!fetchedToken) throw new TokenAuthenticationException('Invalid token or expired token.')
  
    const reply = await extendTokenExpiry(namespace)
    if (!reply) throw new TokenAuthenticationException('Failed to extend token expiry.')

    return true
  } catch (err) {
    throw new TokenAuthenticationException(err.message)
  }
}

export function extendTokenExpiry(namespace: string) {
  return redis.expire(namespace, 15 * 60)
}


export async function revokeAllToken(email: string) {
  try {
    const pattern = `${encodeNamespace(email, '')}*`
    const keys = await redis.keys(pattern)
    const rely = await redis.del(...keys)

    if (!rely) throw new TokenRevokeFailureException('Fail to delete token.')

    return {
      removed: rely
    }
  } catch (err) {
    console.log(err)
    throw new TokenRevokeFailureException(err.message)
  }
}
