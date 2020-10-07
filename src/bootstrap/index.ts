import SystemUser from "../features/system/SystemUser";
import getSequelize from "./sequelize";
import setupServer, { afterStartup } from "./server";

export default function bootstrap() {
  getSequelize()
  setupServer(afterStartup)
}
