import { config } from "dotenv"
import InvalidConfiguration from "../exceptions/bootstrap/InvalidConfiguration"

export default function setupConfig(): void {
  config()
  if (!process.env.DB_CONNECTION_URL) {
    throw new InvalidConfiguration("Missing DB_CONNECTION_URL environment variable.")
  }
}
