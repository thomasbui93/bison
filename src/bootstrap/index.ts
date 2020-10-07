import setupConfig from "./config";
import setupServer, { afterStartup } from "./server";

export default function bootstrap() {
  setupConfig()
  setupServer(afterStartup)
}
