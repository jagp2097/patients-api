const { DataTypes, Model } = require('sequelize')
const sequelizeInstance = require('../sequelize/app')
const bcrypt = require('bcrypt')

const RolesUsers = require('./RolesUsers')
const Role = require('./Role')
const { password } = require('../sequelize/db.config')

class User extends Model {}

User.init({
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
        type: DataTypes.STRING(40),
        allowNull: false
    },
    created_at: {
        type: DataTypes.STRING,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Model options
    modelName: 'User',
    tableName: 'Users',
    timestamps: false, 
    sequelize: sequelizeInstance // We need to pass the connection instance
}, {
    // Model hooks 
    hooks: {
        beforeCreate() {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(this.password, salt, (err, hash) => {
                    console.log(`Password: ${hash}`)
                })
            })
        }
    }
})

// User.belongsToMany(Role, { through: RolesUsers });

module.exports = User