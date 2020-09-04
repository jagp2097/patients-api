const { DataTypes, Model } = require('sequelize')
const User = require('./User')
const Role = require('./Role')

class RolesUsers extends Model {}

RolesUsers.init(
    {
        // Model attributes
        role_user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Role,
                key: 'role_id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'user_id'
            }
        }
    },
    {
        // Model oprtions
        tableName: 'RolesUsers',
        timestamps: false
    }
)

module.exports = RolesUsers;