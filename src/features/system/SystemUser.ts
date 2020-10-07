const { DataTypes } = require('sequelize')
import getSequelize from '../../bootstrap/sequelize'

const SystemUser = getSequelize().define('SystemUser', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expiry: {
    type: DataTypes.DATE,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'system_users',
  timestamps: false
})

export default SystemUser
