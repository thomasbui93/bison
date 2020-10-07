import { Op } from "sequelize"
import SystemUserAuthenticationFailed from "../../exceptions/features/system/SystemUserAuthenticationFailed"
import { nextExpiry } from "./create_user"
import SystemAuthenticationPayload from "./SystemAuthenticationPayload"
import SystemUser from "./SystemUser"

export default async function authenticate(payload: SystemAuthenticationPayload) {
  try {
    const token = await SystemUser.findOne({
      attributes: ['token'],
      where: {
        ...payload,
        isActive: true,
        expiry: {
          [Op.gt]: nextExpiry()
        }
      }
    })
    return token
  } catch (err) {
    throw new SystemUserAuthenticationFailed(err.getMessage())
  }
}
