const express = require('express')
const router = express.Router()
const rolesRoutes = require('../../controllers/RoleController')

// Get roles
router.get('/roles', (req, res, next) => {
    const roles = rolesRoutes.getRoles()
    roles.then(roles => {
        res.status(200).json(roles)
    }).catch(error => {
        console.log(error)
        next(error)
    })
})

// Get a specified role
router.get('/role/:roleId', (req, res, next) => {
    const role = rolesRoutes.getRoleById(req.params.roleId)
    role.then(role => {
        if (role) 
            res.status(200).json(role)
        else 
            res.status(404).send("Role not found.")
    }).catch(error => {
        console.log(error)
        next(error)
    })
})

// Create a role
router.post('/roles', (req, res, next) => {
    const roleName = req.body.roleName

    if (roleName === '' || roleName === undefined) {
        res.status(400).send('Bad request: role name not provided.')
    }

    else {
        const role = rolesRoutes.createRole(roleName)
        role.then(role => {
            res.status(201).json(role)
        }).catch(error => {
            console.log(error)
            next(error)
        })
    }

})

// Update the specified role
router.put('/role/:roleId', (req, res, next) => {
    const foundRole = rolesRoutes.getRoleById(req.params.roleId)
    const roleName = req.body.roleName

    foundRole.then(foundRole => {
        if (foundRole) {
            
            if (roleName === '' || roleName === undefined) {
                res.status(400).send('Bad request: role name not provided.')
            }
            
            return rolesRoutes.updateRole(foundRole.role_id, roleName)
        }
        else
            res.send(404).send('Role not found.')
    })
    .then(updatedRole => {
        res.status(201).json(updatedRole)
    }).catch(error => {
        console.log(error)
        next(error)
    })

})

// Delete the specified Role
router.delete('/roles/:roleId', (req, res, next) => {
    const foundRole = rolesRoutes.getRoleById(req.params.roleId)

    foundRole.then(foundRole => {
        if (foundRole)
            return rolesRoutes.deleteRole(foundRole.role_id)
        else
            res.status(404).send('Role not found.')
    })
    .then(role => {
        res.status(200).json(role)
    }).catch(error => {
        console.log(error)
        next(error)
    })
})

module.exports = router