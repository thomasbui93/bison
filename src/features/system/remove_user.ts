import SystemUserRemovalException from '../../exceptions/features/system/SystemUserRemovalException'
import SystemUser from './SystemUser'

export default async function removeUser(name: string) {
  try {
    const [userCount] = await SystemUser.update({ isActive: false }, {
      where: {
        name
      }
    })
    if (userCount < 1) {
      throw new SystemUserRemovalException('Invalid user.')
    }
  } catch (err) {
    throw new SystemUserRemovalException(err.message)
  }
}
