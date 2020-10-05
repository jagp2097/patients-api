const dbConfig = require('./db.config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
    dialect: dbConfig.dialect,
    host: dbConfig.host
})

module.exports = sequelize