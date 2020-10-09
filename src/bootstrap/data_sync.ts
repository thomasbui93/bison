import SystemUser from "../features/system/SystemUser";

// TODO: Remove this in production.
export default function dataSync() {
  return SystemUser.sync({force: true})
}
