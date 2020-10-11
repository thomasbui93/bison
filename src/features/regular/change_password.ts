import { compare, hash } from 'bcrypt'
import ChangePasswordFailure from '../../exceptions/features/regular/ChangePasswordFailure';
import NormalUser from './NormalUser';

const saltRounds = parseInt(process.env.SALT_ROUNDS)

export default async function changePassword(email: string, oldPassword: string, newPassword: string) {
  try {
    const user = await NormalUser.findOne({
      where: {
        email,
        isActive: true
      }
    })
    if (!user) throw new ChangePasswordFailure('User not found.')
    const isCorrectPassword = await compare(oldPassword, user.get('password').toString())

    if (!isCorrectPassword) throw new ChangePasswordFailure('Wrong given password and email.')

    const hashedPassword = await hash(newPassword, saltRounds)
    await user.update({
      password: hashedPassword
    })
    return true
  } catch (err) {
    throw new ChangePasswordFailure(err.message)
  }
}
