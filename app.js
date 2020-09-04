const express = require('express')
const app = express()
const port = 3000

const Sequelize = require('sequelize')

const connectionDatabase = async () => {
    try {
        const sequelize = new Sequelize('patients_pcroject', 'sa', 'Chuyoso21', {
            dialect: 'mssql',
            host: 'localhost',
        })

        await sequelize.authenticate()
        console.log('Connection has been established successfully.');
        sequelize.close()
    } catch(error) {
        console.error('Unable to connect to the database.')
        console.error(`Error message: ${error.message}`)
    }
}

const init = async () => {
    await connectionDatabase();
    
    app.listen(port, () => {
        console.log(`Express server started on http://localhost:${port}`);
    })
}

init()
