const express = require('express')
const path = require('path')

const app = express()
const port = 3008

const cors = require('cors')
const sequelizeInstance = require('./config/app')

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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

    app.use(express.static(path.join(path.dirname(require.main.filename), 'images')))

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
