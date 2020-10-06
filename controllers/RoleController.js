const Role = require('../models/Role')
const sequelizeInstance = require('../config/app')
let transaction

/**
 * Retrieve a listing of the Role instance.
 */
const getRoles = async () => {
    try {
        transaction = await sequelizeInstance.transaction()
        const roles = await Role.findAll({
            transaction: transaction
        })
        await transaction.commit()
        return roles
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Retrieve a specified Role.
 * 
 * @param {*} roleId 
 */
const getRoleById = async (roleId) => {
    try {
        transaction = await sequelizeInstance.transaction()
        const role = await Role.findOne({
            where: {
                role_id: roleId
            },
            transaction: transaction
        })
        await transaction.commit()
        return role
    } catch (error) {
        console.log(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Store a new created Role in storage.
 * 
 * @param {*} roleName
 */
const createRole = async (roleName) => {
    try {
        transaction = await sequelizeInstance.transaction()
        const role = Role.build({
            role_name: roleName
        })
        await role.save({
            transaction: transaction
        })
        await transaction.commit()
        console.log(`The role ${role.role_name} with ID ${role.role_id} was saved to the database!`)
        return role
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Update the specified Role in storage.
 * 
 * @param {*} roleId
 * @param {*} roleName
 */
const updateRole = async (roleId, roleName) => {
    try {
        transaction = await sequelizeInstance.transaction()
        const role = await Role.update({
            role_name: roleName
        }, {
            where: {
                role_id: roleId
            },
            transaction: transaction
        })
        await transaction.commit()
        return role
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Delete the specified Role from storage.
 * 
 * @param {*} roleId
 */
const deleteRole = async (roleId) => {
    try {
        transaction = await sequelizeInstance.transaction()
        const role = await Role.destroy({
            where: {
                role_id: roleId
            },
            transaction: transaction
        })
        await transaction.commit()
        console.log(`The role with ID ${roleId} was deleted to the database!`)
        return role
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

module.exports = {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
}