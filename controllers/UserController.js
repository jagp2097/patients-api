const User = require('../models/User')
const sequelizeInstance = require('../config/app')
let transaction

/**
 * Retrieve a listing of the User resource.
 */
const getAllUsers = async () => {
    try {
        transaction = await sequelizeInstance.transaction()
        const users = await User.findAll({
            transaction: transaction
        })
        await transaction.commit()
        return users
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Retrieve the specified User.
 * 
 * @param {*} userId 
 */
const getUserById = async (userId) => {
    try {
        transaction = await sequelizeInstance.transaction()
        const user = await User.findOne({
            where: {
                user_id: userId
            },
            transaction: transaction
        })
        await transaction.commit()
        return user
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Store a new created User in storage.
 * 
 * @param {*} username 
 * @param {*} password 
 */
const createUser = async (username, password) => {
    try {
        transaction = await sequelizeInstance.transaction()
        const user = User.build({
            username: username,
            password: password,
            created_at: new Date(Date.now()).toISOString(),
            updated_at: new Date(Date.now()).toISOString()
        })
        await user.save({
            transaction: transaction
        })        
        await transaction.commit()
        console.log(`The user ${user.username} with ID ${user.user_id} was saved to the database!`)
        return user
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
} 

/**
 * Update the specified User in storage.
 * 
 * @param {*} userId 
 * @param {*} username 
 * @param {*} password 
 */
const updateUser = async (userId, username, password) => {
    try {
        transaction = await sequelizeInstance.transaction()
        const user = await User.update({
            username: username,
            password: password,
            updated_at: new Date(Date.now()).toISOString(),
        }, {
            where: {
                user_id: userId
            },
            transaction: transaction
        })
        await transaction.commit()
        return user
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Remove the specified User from storage.
 * 
 * @param {*} userId 
 */
const deleteUser = async (userId) => {
    try {
        transaction = await sequelizeInstance.transaction()
        const user = await User.destroy({
            where: {
                user_id: userId
            },
            transaction: transaction
        })
        await transaction.commit()
        console.log(`The user with ID ${userId} was deleted to the database!`)
        return user
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error 
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}