import SystemUserRemovalException from "../../exceptions/features/system/SystemUserRemovalException"
import SystemUser from "./SystemUser"

export default async function removeUser(name: string) {
  try {
    await SystemUser.update({ isActive: false }, {
      where: {
        name
      }
    })
    return true
  } catch (err) {
    throw new SystemUserRemovalException(err.getMessage())
  }
}
