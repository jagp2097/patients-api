const { DataTypes, Model } = require('sequelize')
const sequelizeInstance = require('../config/app')

class Patient extends Model {
    fullName(firstName, lastName) {
        return `${firstName} ${lastName}`
    }
}

Patient.init({
    // Model attributes
    patient_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    patient_name: {
        type: DataTypes.STRING(180),
        allowNull: false
    },
    birthday: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
}, {
    // Model options
    modelName: 'Patient',
    tableName: 'Patients',
    timestamps: false,
    sequelize: sequelizeInstance
})

module.exports = Patient