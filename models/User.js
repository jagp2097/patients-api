const { DataTypes, Model } = require('sequelize')
const sequelizeInstance = require('../sequelize/app')
const bcrypt = require('bcrypt')

const Role = require('./Role')
const RolesUsers = require('./RolesUsers')

class User extends Model {
    async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword)
    }
}

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
        allowNull: false,
        validate: {
            passwordLength(value) {
                if (value.length < 8) 
                    throw new Error('The length of the password must be greater than or equals to 8.')
            }
        }
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
})

// Hooks
User.beforeCreate(async (user, options) => {
    const hashedPassword = await encryptPassword(user.password)
    user.password = hashedPassword
});

User.beforeBulkUpdate(async options => {
    const hashedPassword = await encryptPassword(options.attributes.password)
    options.attributes.password = hashedPassword
})

const encryptPassword = async (password) => {
    const encryptedPassword = await bcrypt.hash(password, 10)
    return encryptedPassword
}

module.exports = User