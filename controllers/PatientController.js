const Patient = require('../models/Patient')
const sequelizeInstance = require('../config/app')
let transaction

/**
 * Retrieve a listing of the Patient resource.
 */
const getPatients = async () => {
    try {
        transaction = await sequelizeInstance.transaction()
        const patients = await Patient.findAll({
            transaction: transaction
        })
        await transaction.commit()
        return patients
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Retrieve the specified Patient.
 * 
 * @param {*} patientId
 */
const getPatientById = async (patientId) => {
    try {
        transaction = await sequelizeInstance.transaction()
        const patient = await Patient.findOne({
            where: {
                patient_id: patientId
            },
            transaction: transaction
        })
        await transaction.commit()
        return patient
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Store a new created Patient in storage.
 * 
 * @param {*} firstName
 * @param {*} lastName
 * @param {*} birthday
 * @param {*} email
 */
const createPatient = async (firstName, lastName, birthday, email) => {
    try {
        transaction = await sequelizeInstance.transaction()
        const patient = Patient.build({
            birthday: new Date(birthday).toISOString(),
            email: email
        })
        patient.patient_name = patient.fullName(firstName, lastName)
        await patient.save({
            transaction: transaction
        })
        await transaction.commit()
        console.log(`The user ${patient.patient_name} with ID ${patient.patient_id} was saved to the database!`)
        return patient
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Update the specified Patient in storage.
 * 
 * @param {*} patientId
 * @param {*} firstName
 * @param {*} lastName
 * @param {*} birthday
 * @param {*} email
 */
const updatePatient = async (patientId, firstName, lastName, birthday, email) => {
    try {
        transaction = await sequelizeInstance.transaction()
        let patient = new Patient()
        const fullName = patient.fullName(firstName, lastName)
        patient = await Patient.update({
            patient_name: fullName,
            birthday: new Date(birthday).toISOString(),
            email: email
        }, {
            where: {
                patient_id: patientId
            },
            transaction: transaction
        })
        await transaction.commit()
        return patient
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
} 

/**
 * Remove the specified Patient from storage.
 * 
 * @param {*} patientId
 */
const deletePatient = async (patientId) => {
    try {
        transaction = await sequelizeInstance.transaction()
        const patient = await Patient.destroy({
            where: {
                patient_id: patientId
            },
            transaction: transaction
        })
        await transaction.commit()
        return patient
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

module.exports = {
    getPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
}