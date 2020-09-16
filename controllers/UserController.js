const User = require('../models/User');
const { user } = require('../sequelize/db.config');
const { options } = require('../models/User');

/**
 * Retrieve a listing of the User resource.
 */
const getAllUsers = async () => {
    try {
        const users = await User.findAll()
        return users
    } catch (error) {
        console.error(error);
    }
}

/**
 * Retrieve the specified User.
 * 
 * @param {*} userId 
 */
const getUserById = async (userId) => {
    try {
        const user = await User.findOne({
            where: {
                user_id: userId
            }
        })
        return user
    } catch (error) {
        console.error(error)
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
        const user = User.build({
            username: username,
            password: password,
            created_at: new Date(Date.now()).toISOString(),
            updated_at: new Date(Date.now()).toISOString()
        })
        await user.save()        
        console.log(`The user ${user.username} with ID ${user.user_id} was saved to the database!`)
        return user
    } catch (error) {
        console.error(error)
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
        const user = await User.update({
            username: username,
            password: password,
            updated_at: new Date(Date.now()).toISOString(),
        }, {
            where: {
                user_id: userId
            }
        })
        return user
    } catch (error) {
        console.error(error);
    }
}

/**
 * Remove the specified User from storage.
 * 
 * @param {*} userId 
 */
const deleteUser = async (userId) => {
    try {
        const user = await User.destroy({
            where: {
                user_id: userId
            }
        })
        console.log(`The user with ID ${userId} was deleted to the database!`)
        return user
    } catch (error) {
        console.error(error);        
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}