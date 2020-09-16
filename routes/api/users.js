const express = require('express')
const router = express.Router()
const userRoutes = require('../../controllers/UserController')

// Get users
router.get('/users', (req, res, next) => {
    const users = userRoutes.getAllUsers()
    
    users.then(users => {
        res.status(200).json(users)
    }).catch(error => {
        console.log(error)
        next(error)
    })
})

// Get a specified user
router.get('/user/:userId', (req, res, next) => {
    const user = userRoutes.getUserById(req.params.userId)
    user.then(user => {
        if (user)
            res.status(200).json(user)
        else
            res.status(404).send('User not found...')
    }).catch(error => {
        console.log(error);
        next(error)
    })
})

// Create a new user
router.post('/users', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    if (username === null || username === '' || username === undefined) {
        res.status(400).send('Bad request: username not provided.')
    }

    else if (password === null || password === '' || password === undefined) {
        res.status(400).send('Bad request: password not prodived.')
    }

    else {
        const user = userRoutes.createUser(username, password)
        user.then(newUser => {
            if (newUser.errors) {
                res.status(400).send(`Bad request: ${newUser.errors[0].message}`)
            }
            res.status(201).json(newUser)
        }).catch(error => {
            console.log(error)
            next(error)
        })
    }
})

// Update de specified user
router.put('/user/:userId', (req, res, next) => {
    const foundUser = userRoutes.getUserById(req.params.userId)
    const username = req.body.username
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword

    foundUser.then(foundUser => {
        if (foundUser) {
           
            if (username === null || username === '' || username === undefined) {
                res.status(400).send('Bad request: username not provided.')
            }
    
            if (oldPassword === null || oldPassword === '' || oldPassword === undefined) {
                res.status(400).send('Bad request: old password not provided.')
            }

            if (newPassword === null || newPassword === '' || newPassword === undefined) {
                res.status(400).send('Bad request: new password not provided.')
            }

            return foundUser.verifyPassword(oldPassword, foundUser.password)    
        }
    
        else
            res.status(404).send('User not found.')
    })
    .then(match => {
        if (match)
            return userRoutes.updateUser(req.params.userId, username, newPassword)
        else 
            res.status(400).send('Bad request: the new password does not match with the current password.')
    })
    .then(updatedUser => {
        res.status(201).json(updatedUser)
    }).catch(error => {
        console.log(error)
        next(error)
    })
})

// Delete a specified user
router.delete('/users/:userId', (req, res, next) => {
    const foundUser = userRoutes.getUserById(req.params.userId)

    foundUser.then(foundUser => {
        if (foundUser)
            return userRoutes.deleteUser(foundUser.user_id)
    
        else 
            res.status(404).send('User not found.')
    })
    .then(user => {
        res.status(200).json(user)
    }).catch(error => {
        console.log(error)
        next(error)
    })
})

module.exports = router;