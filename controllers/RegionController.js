const Region = require('../models/Region')
const sequelizeInstance = require('../config/app')
let transaction

/**
 * Retrieve a listing of the Region resource.
 */
const getRegions = async () => {
    try {
        transaction = await sequelizeInstance.transaction()
        const regions = await Region.findAll({
            transaction: transaction
        })
        await transaction.commit()
        return regions
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Retrieve the specified Region.
 * 
 * @param {*} regionId
 */
const getRegionById = async regionId => {
    try {
        transaction = await sequelizeInstance.transaction()
        const region = await Region.findOne({
            where: {
                region_id: regionId
            },
            transaction: transaction
        })
        await transaction.commit()
        return region
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Store a new created Region in storage.
 * 
 * @param {*} regionName
 */
const createRegion = async regionName => {
    try {
        transaction = await sequelizeInstance.transaction()
        const region = Region.build({
            region_name: regionName
        })
        await region.save({
            transaction: transaction
        })
        await transaction.commit()
        console.log(`The region ${region.region_name} with ID ${region.region_id} was saved to the database!`)
        return region
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Update the specified Region in storage.
 * 
 * @param {*} regionId
 * @param {*} regionName
 */
const updateRegion = async (regionId, regionName) => {
    try {
        transaction = await sequelizeInstance.transaction()
        const region = await Region.update({
            region_name: regionName
        }, {
            where: {
                region_id: regionId
            },
            transaction: transaction
        })
        await transaction.commit()
        console.log(`The region with ID ${regionId} was updated to the database!`)
        return region
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Remove the specified Region from storage.
 * 
 * @param {*} regionId
 */
const deleteRegion = async regionId => {
    try {
        transaction = await sequelizeInstance.transaction()
        const region = await Region.destroy({
            where: {
                region_id: regionId
            },
            transaction: transaction
        })
        await transaction.commit()
        console.log(`The region with ID ${regionId} was deleted to the database!`)
        return region
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

module.exports = {
    getRegions,
    getRegionById,
    createRegion,
    updateRegion,
    deleteRegion
}