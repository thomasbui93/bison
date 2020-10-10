import { DataTypes } from 'sequelize'
import getSequelize from '../../bootstrap/sequelize'

const NormalUser = getSequelize().define('NormalUser', {
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['email']
    }
  ]
})

export default NormalUser
