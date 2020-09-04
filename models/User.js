const { DataTypes, Model } = require('sequelize')
const Role = require('./Role')
const RolesUsers = require('./RolesUsers')

class User extends Model {}

User.init(
    {
        // Model attributes
        user_id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(80),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE(6),
            allowNull: false
        },
        update_at: {
            type: DataTypes.DATE(6),
            allowNull: false
        }
    }, 
    {
        // Model options
        // sequelize, // We need to pass the connection instance
        tableName: 'Users',
        timestamps: false, 
        // createdAt: 'created_at',
        // updateAt: 'update_at'
    }
)

User.belongsToMany(Role, { through: RolesUsers });

module.exports = User;