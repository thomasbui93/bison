import DeactivateUserFailure from '../../exceptions/features/regular/DeactivateUserFailure';
import NormalUser from './NormalUser';

export async function deactivate(email: string) {
  try {
    const [result] = await NormalUser.update({
      isActive: false
    }, {
      where: {
        email
      }
    })
    if (result === 0) throw new DeactivateUserFailure('User not found.')
    return true
  } catch (err) {
    throw new DeactivateUserFailure(err.message)
  }
}

export async function bulkDeactivate(emails: string) {
  try {
    const [result] = await NormalUser.update({
      isActive: false
    }, {
      where: {
        email: emails.split(' ')
      }
    })
    return result
  } catch (err) {
    throw new DeactivateUserFailure(err.message)
  }
}
