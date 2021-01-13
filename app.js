const express = require('express')
const path = require('path')

const app = express()
const port = 3008

const sequelizeInstance = require('./config/app')

// app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static(path.join(path.dirname(require.main.filename), 'images')))

const dataBaseConnection = async () => {
    try {
        await sequelizeInstance.authenticate()
        console.log('Connection has been established successfully.')
        // sequelizeInstance.close()
    } catch (error) {
        console.error('Unable to connect to the database.')
        console.error(`Error message: ${error.message}`)
    }
}

const init = () => {

    dataBaseConnection()

    // Enable CORS
    // This middleware sets the neccesary headers to the incoming request to enable CORS
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        next()
    }) 

    app.use('/api', require('./routes/auth'))
    app.use('/api', require('./routes/users'))
    app.use('/api', require('./routes/roles'))
    app.use('/api', require('./routes/patients'))
    app.use('/api', require('./routes/albums'))
    app.use('/api', require('./routes/files'))
    app.use('/api', require('./routes/regions'))
    app.use('/api', require('./routes/clinics'))
    app.use('/api', require('./routes/surgicalperiods'))

    app.listen(port, () => {
        console.log(`Express server started on http://localhost:${port}`);
    })

}

init()
