import { DataTypes } from 'sequelize'
import getSequelize from '../../bootstrap/sequelize'

const NormalUser = getSequelize().define('NormalUser', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
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
  ],
})

NormalUser.prototype.toJSON = function () {
  const values = Object.assign({}, this.get())

  delete values.password
  return values
}

export default NormalUser
