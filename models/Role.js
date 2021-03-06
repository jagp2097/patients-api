const { DataTypes, Model } = require('sequelize')
const sequelizeInstance = require('../config/app')

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

module.exports = Role