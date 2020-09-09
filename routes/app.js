const express = require('express')
const app = express()

const routes = {
    users: require('./routes/api/users')
}

