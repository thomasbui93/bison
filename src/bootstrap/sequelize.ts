import setupConfig from "./config"
import { Sequelize as SequelizeType } from "sequelize/types"
import { Sequelize } from 'sequelize'
let sequelize: SequelizeType = null

export default function getSequelize(): SequelizeType {
  if (sequelize !== null) return sequelize
  setupConfig()
  sequelize = new Sequelize(process.env.DB_CONNECTION_URL, {
    dialect: 'mysql'
  })
  return sequelize
}
