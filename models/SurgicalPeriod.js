const { DataTypes, Model } = require('sequelize')
const sequelizeInstance = require('../config/app')

class SurgicalPeriod extends Model {}

SurgicalPeriod.init({
    // Model attributes
    period_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    period_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    // Model options
    modelName: 'SurgicalPeriod',
    tableName: 'SurgicalPeriods',
    timestamps: false,
    sequelize: sequelizeInstance
})

module.exports = SurgicalPeriod

const File = require('./File')

SurgicalPeriod.hasMany(File, {
    foreignKey: 'period_id'
})
