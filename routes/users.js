const express = require('express')
const router = express.Router()
const userRoutes = require('../controllers/UserController')
const isAuth = require('../middlewares/is-auth')

// Get users
router.get('/users', isAuth, (req, res, next) => {
    const users = userRoutes.getAllUsers()
    
    users.then(users => {
        res.status(200).json(users)
    }).catch(error => {
        console.log(error)
        next(error)
    })
})

// Get a specified user
router.get('/user/:userId', isAuth, (req, res, next) => {
    const user = userRoutes.getUserById(req.params.userId)
    user.then(user => {
        if (user)
            res.status(200).json(user)
        else {
            res.status(404).format({
                'text/plain': () => res.send('User not found.')
            })
        }
    }).catch(error => {
        console.log(error);
        next(error)
    })
})

// Create a new user
router.post('/users', isAuth, (req, res, next) => {
    const username = req.body.username.trim()
    const password = req.body.password.trim()

    if (username === null || username === '' || username === undefined) {
        res.status(400).format({
            'text/plain': () => res.send('Bad request: username not provided.')
        })
        return
    }

    else if (password === null || password === '' || password === undefined) {
        res.status(400).format({
            'text/plain': () => res.send('Bad request: password not provided.')
        })
        return
    }

    else {
        const user = userRoutes.createUser(username, password)
        user.then(newUser => {
            if (newUser.errors) {
                res.status(400).format({
                    'text/plain': () => res.send(`Bad request: ${newUser.errors[0].message}`)
                })
                return
            }
            res.status(201).json(newUser)
        }).catch(error => {
            console.log(error)
            next(error)
        })
    }
})

// Update the specified user
router.put('/user/:userId', isAuth, (req, res, next) => {
    const foundUser = userRoutes.getUserById(req.params.userId)
    const username = req.body.username.trim()
    const oldPassword = req.body.oldPassword.trim()
    const newPassword = req.body.newPassword.trim()

    foundUser.then(foundUser => {
        if (foundUser) {
           
            if (username === null || username === '' || username === undefined) {
                res.status(400).format({
                    'text/plain': () => res.send('Bad request: username not provided.')
                })
                return
            }
    
            if (oldPassword === null || oldPassword === '' || oldPassword === undefined) {
                res.status(400).format({
                    'text/plain': () => res.send('Bad request: old password not provided.')
                })
                return
            }

            if (newPassword === null || newPassword === '' || newPassword === undefined) {
                res.status(400).format({
                    'text/plain': () => res.send('Bad request: new password not provided.')
                })
                return
            }

            return foundUser.verifyPassword(oldPassword, foundUser.password)    
        }
    
        else {
            res.status(404).format({
                'text/plain': () => res.send('User not found.')
            })
        }
    })
    .then(match => {
        if (match)
            return userRoutes.updateUser(req.params.userId, username, newPassword)
        else {
            res.status(400).format({
                'text/plain': () => res.send('Bad request: the new password does not match with the current password.')
            })
        }
    })
    .then(updatedUser => {
        res.status(201).json(updatedUser)
    }).catch(error => {
        console.log(error)
        next(error)
    })
})

// Delete a specified user
router.delete('/users/:userId', isAuth, (req, res, next) => {
    const foundUser = userRoutes.getUserById(req.params.userId)

    foundUser.then(foundUser => {
        if (foundUser)
            return userRoutes.deleteUser(foundUser.user_id)
    
        else {
            res.status(404).format({
                'text/plain': () => res.send('User not found.')
            })
        }
    })
    .then(user => {
        res.status(200).json(user)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

module.exports = router;