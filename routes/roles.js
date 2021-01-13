const express = require('express')
const router = express.Router()
const rolesRoutes = require('../controllers/RoleController')
const isAuth = require('../middlewares/is-auth')

// Get roles
router.get('/roles', isAuth, (req, res, next) => {
    const roles = rolesRoutes.getRoles()
    roles.then(roles => {
        res.status(200).json(roles)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Get a specified role
router.get('/role/:roleId', isAuth, (req, res, next) => {
    const role = rolesRoutes.getRoleById(req.params.roleId)
    role.then(role => {
        if (role) 
            res.status(200).json(role)
        else {
            res.status(404).format({
                'text/plain': () => res.send('Role not found.')
            })
        }
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Create a role
router.post('/roles', isAuth, (req, res, next) => {
    const roleName = req.body.roleName.trim()

    if (roleName === '' || roleName === undefined) {
        res.status(400).format({
            'text/plain': () => res.send('Bad request: role name not provided.')
        })
        return
    }

    const role = rolesRoutes.createRole(roleName)
    role.then(role => {
        res.status(201).json(role)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Update the specified role
router.put('/role/:roleId', isAuth, (req, res, next) => {
    const foundRole = rolesRoutes.getRoleById(req.params.roleId)
    const roleName = req.body.roleName.trim()

    foundRole.then(foundRole => {
        if (foundRole) {
            
            if (roleName === '' || roleName === undefined) {
                res.status(400).format({
                    'text/plain': () => res.send('Bad request: role name not provided.')
                })
                return
            }
            
            return rolesRoutes.updateRole(foundRole.role_id, roleName)
        }
        else {
            res.status(404).format({
                'text/plain': () => res.send('Role not found.')
            })
            return
        }
    })
    .then(updatedRole => {
        res.status(201).json(updatedRole)
    }).catch(error => {
        console.error(error)
        next(error)
    })

})

// Delete the specified Role
router.delete('/roles/:roleId', isAuth, (req, res, next) => {
    const foundRole = rolesRoutes.getRoleById(req.params.roleId)

    foundRole.then(foundRole => {
        if (foundRole)
            return rolesRoutes.deleteRole(foundRole.role_id)
        else {
            res.status(404).format({
                'text/plain': () => res.send('Role not found.')
            })
        }
    })
    .then(role => {
        res.status(200).json(role)
    }).catch(error => {
        console.log(error)
        next(error)
    })
})

module.exports = router