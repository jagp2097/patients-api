const { DataTypes, Model } = require('sequelize')
const User = require('./User')
const RolesUsers = require('./RolesUsers')
const sequelizeInstance = require('../sequelize/app')

class Role extends Model {}

Role.init({
    // Model attributes
    role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    }
}, {
    // Model options
    modelName: 'Role',
    tableName: 'Roles',
    timestamps: false,
    sequelize: sequelizeInstance
})

// Role.belongsToMany(User, { through: RolesUsers })

module.exports = Role