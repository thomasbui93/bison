import { hash } from 'bcrypt'
import NormalUserCreateException from '../../exceptions/features/regular/NormalUserCreationException';
import NormalUser from './NormalUser';

const saltRounds = process.env.SALT_ROUNDS

export default async function createUser(email: string, password: string) {
  try {
    const hashedPassword = await hash(password, saltRounds)
    const user = await NormalUser.create({
      email,
      password: hashedPassword,
      isActive: true,
    })
    return user.toJSON()
  } catch (err) {
    throw new NormalUserCreateException(err)
  }
}
