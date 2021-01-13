const express = require('express')
const router = express.Router()
const auth = require('../controllers/AuthController')

router.post('/login', auth.login)

module.exports = router