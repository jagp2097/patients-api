const Clinic = require('../models/Clinic')

const sequelizeInstance = require('../config/app')
let transaction

/**
 * Retrieve a listing of the Clinic resource.
 */
const getClinics = async () => {
    try {
        transaction = await sequelizeInstance.transaction()
        const clinics = await Clinic.findAll({
            transaction: transaction
        })
        await transaction.commit()
        return clinics
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Retrieve the specified Clinic.
 * 
 * @param {*} clinicId
 */
const getClinicById = async clinicId => {
    try {
        transaction = await sequelizeInstance.transaction()
        const clinic = await Clinic.findAll({
            where: {
                clinic_id: clinicId
            },
            transaction: transaction
        })
        await transaction.commit()
        return clinic
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
} 

/**
 * Store a new created Clinic in storage.
 * 
 * @param {*} clinicName
 */
const createClinic = async clinicName => {
    try {
        transaction = await sequelizeInstance.transaction()
        const clinic = Clinic.build({
            clinic_name: clinicName 
        })
        await clinic.save({
            transaction: transaction
        })
        await transaction.commit()
        console.log(`The clinic ${clinic.clinic_name} with ID ${clinic.clinic_id} was saved to the database!`)
        return clinic
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error   
    }
}

/**
 * Update the specified Clinic in storage.
 * 
 * @param {*} clinicId
 * @param {*} clinicName
 */
const updateClinic = async (clinicId, clinicName) => {
    try {
        transaction = await sequelizeInstance.transaction()
        const clinic = await Clinic.update({
            clinic_name: clinicName
        }, {
            where: {
                clinic_id: clinicId
            },
            transaction: transaction
        })
        await transaction.commit()
        console.log(`The clinic with ID ${clinicId} was updated to the database!`)
        return clinic
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Remove the specified Clinic from storage.
 * 
 * @param {*} clinicId
 */
const deleteClinic = async clinicId => {
    try {
        transaction = await sequelizeInstance.transaction()
        const clinic = await Clinic.destroy({
            where: {
                clinic_id: clinicId
            },
            transaction: transaction
        })
        await transaction.commit()
        console.log(`The clinic with ID ${clinicId} was deleted to the database!`)
        return clinic
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

module.exports = {
    getClinics, 
    getClinicById,
    createClinic, 
    updateClinic,
    deleteClinic
}