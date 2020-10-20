const { DataTypes, Model } = require('sequelize')
const sequelizeInstance = require('../config/app')

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

const Patient = require('./Patient')
const File = require('./File')

Album.hasMany(File, {
    foreignKey: {
        name: 'album_id'
    }
})
Album.belongsTo(Patient, {
    foreignKey: {
        name: 'patient_id'
    },
    targetKey: 'patient_id'
})
