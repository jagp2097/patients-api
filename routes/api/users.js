const express = require('express')
const router = express.Router()
const userRoutes = require('../../controllers/UserController')

/**
 * TODO
 * validar los campos
 * enviar los codigos correctos
 * relacionar los modelos
 * encriptar la contraseña
 */

router.get('/users', (req, res) => {
    const users = userRoutes.getAllUsers()
    users.then(users => {
        res.status(200).json(users)
    }).catch(error => {
        console.log(error)
        res.status(501).send('Internal Server Error...')
    })
})

router.get('/user/:userId', (req, res) => {
    const user = userRoutes.getUserById(req.params.userId)
    user.then(user => {
        if (user)
            res.status(200).json(user)
        else
            res.status(404).send('User not found...')
    }).catch(error => {
        console.log(error);
        res.status(501).send('Internal Server Error...')
    })
})

router.post('/users', (req, res) => {
    const user = userRoutes.createUser(req.body.username, req.body.password)
    user.then(newUser => {
        res.status(201).json(newUser)
    }).catch(error => {
        console.log(error)
        res.status(501).send('Internal Server Error...')
    })
})

router.put('/user/:userId', (req, res) => {
    const user = userRoutes.updateUser(req.params.userId, req.body.username, req.body.password)
    user.then(user => {
        res.status(201).json(user)
    }).catch(error => {
        console.log(error)
        res.status(501).send('Internal Server Error...')
    })
})

router.delete('/users/:userId', (req, res) => {
    const user = userRoutes.deleteUser(req.params.userId)
    user.then(user => {
        if (user)
            res.status(200).json(user)
        else
            res.status(404).send('User not found...')
    }).catch(error => {
        console.log(error)
        res.status(501).send('Internal Server Error...')
    })
})

module.exports = router;