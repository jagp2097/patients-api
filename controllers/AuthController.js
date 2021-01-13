const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    let foundUser

    User.findOne({
        where: {
            username: username
        }
    })
    .then(user => {
        if (!user) {
            return res.status(401).format({
                'text/plain': () => res.send('This username it was not found.')
            })
        }   
        foundUser = user
        return bcrypt.compare(password, user.password)
    })
    .then(result => {
        if (!result) {
            return res.status(401).format({
                'text/plain': () => res.send('Wrong password!')
            })
        }        
        // creates a new jason web token
        const token = jwt.sign(
            {
                user_id: foundUser.user_id,
                username: foundUser.username
            },
            'supersecretsecret', 
            {
                expiresIn: '1h'
            }
        )
        console.log("logueado");
        // this data will sent to the front end
        return res.status(200).json(
            { 
                token: token, 
                user_id: foundUser.user_id, 
                username: foundUser.username 
            }
        )  
    }) 
    .catch(error => {
        if (error) {
            console.log(error);
        }
    })
}

module.exports = {
    login
}
