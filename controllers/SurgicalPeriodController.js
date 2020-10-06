const SurgicalPeriod = require('../models/SurgicalPeriod')
const sequelizeInstance = require('../config/app')
let transaction

/**
 * Retrieve a listing of the SurgicalPeriod resource.
 */
const getSurgicalPeriods = async () => {
    try {
        transaction = await sequelizeInstance.transaction()
        const periods = await SurgicalPeriod.findAll({
            transaction: transaction
        })
        await transaction.commit()
        return periods
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Retrieve the specified SurgicalPeriod.
 * 
 * @param {*} periodId
 */
const getSurgicalPeriodById = async periodId => {
    try {
        transaction = await sequelizeInstance.transaction()
        const period = await SurgicalPeriod.findOne({
            where: {
                period_id: periodId
            },
            transaction: transaction
        })
        await transaction.commit()
        return period
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Store a new created SurgicalPeriod in storage.
 * 
 * @param {*} periodName
 */
const createSurgicalPeriod = async periodName => {
    try {
        transaction = await sequelizeInstance.transaction()
        const period = SurgicalPeriod.build({
            period_name: periodName
        })
        await period.save({
            transaction: transaction
        })
        await transaction.commit()
        console.log(`The surgical period ${period.period_name} with ID ${period.period_id} was saved to the database!`)
        return period
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Update the specified SurgicalPeriod in storage.
 * 
 * @param {*} periodId
 * @param {*} periodName
 */
const updateSurgicalPeriod = async (periodId, periodName) => {
    try {
        transaction = await sequelizeInstance.transaction()
        const period = await SurgicalPeriod.update({
            period_name: periodName
        }, {
            where: {
                period_id: periodId
            },
            transaction: transaction
        })
        await transaction.commit()
        console.log(`The surgical period with ID ${periodId} was updated to the database!`)
        return period
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Remove the specified SurgicalPeriod from storage.
 * 
 * @param {*} periodId
 */
const deleteSurgicalPeriod = async periodId => {
    try {
        transaction = await sequelizeInstance.transaction()
        const period = await SurgicalPeriod.destroy({
            where: {
                period_id: periodId
            },
            transaction: transaction
        })
        await transaction.commit()
        console.log(`The surgical period with ID ${periodId} was deleted to the database!`)
        return period
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

module.exports = {
    getSurgicalPeriods,
    getSurgicalPeriodById,
    createSurgicalPeriod,
    updateSurgicalPeriod,
    deleteSurgicalPeriod
}