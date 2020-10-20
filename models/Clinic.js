const { DataTypes, Model } =  require('sequelize')
const sequelizeInstance = require('../config/app')

class Clinic extends Model {}

Clinic.init({
    // Model attributes
    clinic_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    clinic_name: {
        type: DataTypes.STRING(85),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    // Model options
    modelName: 'Clinic',
    tableName: 'Clinics',
    timestamps: false,
    sequelize: sequelizeInstance
})

module.exports = Clinic

const File = require('./File')

Clinic.hasMany(File, {
    foreignKey: {
        name: 'clinic_id'
    }
})
