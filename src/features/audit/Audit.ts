import { DataTypes } from 'sequelize'
import getSequelize from '../../bootstrap/sequelize'

export const NORMAL_USER = 'NORMAL_USER'
export const SYSTEM_USER = 'SYSTEM_USER'
export const ADMIN_USER = 'ADMIN_USER'

export const USER_TYPES = [
  NORMAL_USER,
  SYSTEM_USER,
  ADMIN_USER
]

export const LOGGED_IN = 'LOGGED_IN'
export const LOGGED_OUT = 'LOGGED_OUT'
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED'
export const TOKEN_VERIFIED = 'TOKEN_VERIFIED'

export const AUTHENTICATION_ACTION = [
  LOGGED_IN,
  LOGGED_OUT,
  TOKEN_VERIFIED,
  PASSWORD_CHANGED
]

const Audit = getSequelize().define('Audit', {
  user_ref: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_type: {
    type: DataTypes.ENUM(...USER_TYPES),
    allowNull: false,
  },
  action: {
    type: DataTypes.ENUM(...AUTHENTICATION_ACTION),
    allowNull: false
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIP: true
    }
  },
  success: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'audits',
  timestamps: true,
  indexes: [
    {
      fields: ['user_ref', 'ip']
    }
  ],
})

export default Audit
