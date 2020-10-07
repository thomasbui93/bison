import SystemUser from "../features/system/SystemUser";

// TODO: Remove this in production.
export default function dataSync() {
  SystemUser.sync({force: true})
}
