import NormalUser from '../features/regular/NormalUser';
import SystemUser from '../features/system/SystemUser';

// TODO: Remove this in production.
export default async function dataSync() {
  await SystemUser.sync()
  await NormalUser.sync()
}
