import SystemUserSearchFailed from '../../exceptions/features/system/SystemUserSearchFailed'
import SystemUser from './SystemUser'

export default async function getSystemUsers(page: number, size: number) {
  try {
    const users = await SystemUser.findAll({
      limit: size,
      offset: size * (page - 1),
    })
    return users
  } catch (err) {
    throw new SystemUserSearchFailed(err.message)
  }
}
