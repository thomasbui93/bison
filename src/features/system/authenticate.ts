import SystemUserAuthenticationFailed from '../../exceptions/features/system/SystemUserAuthenticationFailed'
import { nextExpiry } from './create_user'
import SystemAuthenticationPayload from './SystemAuthenticationPayload'
import SystemUser from './SystemUser'

export default async function authenticate(payload: SystemAuthenticationPayload) {
  try {
    const token = await SystemUser.findOne({
      where: {
        name: payload.name,
        token: payload.token,
        isActive: true
      }
    })
    if (!token) {
      throw new SystemUserAuthenticationFailed('Invalid token.')
    }
    const expiry = token.get('expiry').toString()
    if (new Date(expiry) < new Date()) {
      throw new SystemUserAuthenticationFailed('Expired token. Please issue new token.')
    }

    await token.update({
      expiry: nextExpiry()
    })
    return token
  } catch (err) {
    throw new SystemUserAuthenticationFailed(err.message)
  }
}
