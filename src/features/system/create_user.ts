import SystemUserCreateException from '../../exceptions/features/system/SystemUserCreationException';
import { v4 as uuidv4} from 'uuid';
import SystemUser from './SystemUser';

export default async function createUser(name: string) {
  try {
    const user = await SystemUser.create({
      name,
      token: uuidv4(),
      expiry: nextExpiry(),
      isActive: true,
    })
    return user.toJSON()
  } catch (err) {
    throw new SystemUserCreateException(err)
  }
}

export const nextExpiry = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() + 30)
  return d
}
