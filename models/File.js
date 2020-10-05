const { DataTypes, Model } = require('sequelize')
const sequelizeInstance = require('../config/app')

class File extends Model {}

File.init({
    // Model attributes
    file_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    file_name: {
        type: DataTypes.STRING(120),
        allowNull: false,
        unique: true
    },
    file_reference: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    date_surgery: {
        type: DataTypes.STRING,
        allowNull: false
    },
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    region_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    clinic_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    period_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    album_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    // Model options
    modelName: 'File',
    tableName: 'Files',
    timestamps: false,
    sequelize: sequelizeInstance
})

module.exports = File