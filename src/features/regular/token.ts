import { sign, verify } from 'jsonwebtoken'

type TokenPayload = {
  email: string
}

export function encodeNamespace(email: string, token: string) {
  return `token__${email}__${token}`
}

export async function createToken(email: string) {
  const token = await sign({
    email
  }, process.env.JWT_SECRET)
  const namespace = encodeNamespace(email, token)
  //TODO: Set Redis key value.
  return token
}

export async function isValidToken(token: string) {
  const payload = await verify(token, process.env.JWT_SECRET)
  if (typeof payload !== 'object') return false
  
  const email = (payload as TokenPayload).email
  const namespace = encodeNamespace(email, token)
  //TODO: Redis check exist and expiry.
  await extendTokenExpiry(namespace)
  return true
}

export async function extendTokenExpiry(namespace: string) {
  // TODO: Extend Redis expiry 
}

export async function revokeToken(token: string) {
  //TODO: Redis remove entry
  return true
}
