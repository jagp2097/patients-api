const Role = require('../models/Role')

/**
 * Retrieve a listing of the Role instance.
 */
const getRoles = async () => {
    try {
        const roles = await Role.findAll()
        return roles
    } catch (error) {
        console.error(error)
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
        const role = await Role.findOne({
            where: {
                role_id: roleId
            }
        })
        return role
    } catch (error) {
        console.log(error)
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
        const role = Role.build({
            role_name: roleName
        })
        await role.save()
        console.log(`The role ${role.role_name} with ID ${role.role_id} was saved to the database!`)
        return role
    } catch (error) {
        console.error(error)
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
        const role = await Role.update({
            role_name: roleName
        }, {
            where: {
                role_id: roleId
            }
        })
        return role
    } catch (error) {
        console.error(error)
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
        const role = await Role.destroy({
            where: {
                role_id: roleId
            }
        })
    } catch (error) {
        
    }
}

module.exports = {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
}