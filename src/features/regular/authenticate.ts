import { compare } from 'bcrypt'
import NormalUserAuthenticationFailed from '../../exceptions/features/regular/NormalUserAuthenticationFailed';
import NormalUser from './NormalUser';
import { createToken, isValidToken } from './token';

export async function passwordCheck(email: string, password: string) {
  try {
    const user = await NormalUser.findOne({
      where: {
        email,
        isActive: true
      }
    })
    const hashedPassword = user.get('password').toString()
    const isCorrectPassword = await compare(password, hashedPassword)

    if (!isCorrectPassword) throw new NormalUserAuthenticationFailed('Password is not matched.')
    const token = await createToken(email)
    return token
  } catch (err) {
    throw new NormalUserAuthenticationFailed(err.message)
  }
}


export async function tokenCheck(token: string) {
  try {
    const isValid = await isValidToken(token)

    if (!isValid) throw new NormalUserAuthenticationFailed('Token is invalid.')

    return true
  } catch (err) {
    throw new NormalUserAuthenticationFailed(err.message)
  }
}
