const { DataTypes, Model } = require('sequelize')
const sequelizeInstance = require('../config/app')

class Region extends Model {}

Region.init({
    // Model attributes
    region_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    region_name: {
        type: DataTypes.STRING(75), 
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    // Model options
    modelName: 'Region',
    tableName: 'Regions',
    timestamps: false,
    sequelize: sequelizeInstance
})

module.exports = Region

const File = require('./File')

Region.hasMany(File, {
    foreignKey: {
        name: 'region_id'
    },
})
