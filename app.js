const express = require('express')
const app = express()
const port = 3000

const cors = require('cors')
const sequelizeInstance = require('./sequelize/app')

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

    app.use(require('./routes/users'))
    app.use(require('./routes/roles'))

    app.listen(port, () => {
        console.log(`Express server started on http://localhost:${port}`);
    })

}

init()
