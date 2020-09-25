const { DataTypes, Model } = require('sequelize')
const sequelizeInstance = require('../sequelize/app')

class Album extends Model {}

Album.init({
    // Model attributes
    album_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    album_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    // Model options
    modelName: 'Album',
    tableName: 'Albums',
    timestamps: false,
    sequelize: sequelizeInstance
})

// Hooks
Album.afterSave(async (instance, options) => {
    if (options.transaction) {
        options.transaction.afterCommit(() => console.log('Transaction commited.'))
        return
    }
    console.log('Album saved to the database.')
})  

Album.afterBulkUpdate(async options => {
    if (options.transaction) {
        options.transaction.afterCommit(() => console.log('Transaction commited.'))
        return
    }
    console.log('Album saved to the database.')
})

module.exports = Album