const File = require('../models/File')
const sequelizeInstance = require('../config/app')
let transaction

/**
 * Retrieve a listing of the File resource.
 * 
 * @param {*} patientId
 */
const getFiles = async patientId => {
    try {
        transaction = await sequelizeInstance.transaction()
        const files = await File.findAll({
            transaction: transaction
        })
        await transaction.commit()
        return files
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Retrieve a specified File.
 * 
 * @param {*} patientId
 * @param {*} fileName
 */
const getFileByName = async (patientId, fileName) => {
    try {
        transaction = await sequelizeInstance.transaction()
        const file = await File.findAll({
            where: {
                file_name: fileName,
                patient_id: patientId
            },
            transaction: transaction
        })
        await transaction.commit()
        return file
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Store a new created File in storage.
 * 
 * @param {*} fileName
 * @param {*} fileReference
 * @param {*} dateSurgery
 * @param {*} patientId
 * @param {*} regionId
 * @param {*} clinicId
 * @param {*} periodId
 * @param {*} albumId
 // $fileName = $request->input('file_name').time().'.'.$fileRetrive->extension();
 */

const createFile = async (fileName, fileReference, dateSurgery, patientId, regionId, clinicId, periodId, albumId) => {
    try {
        transaction = await sequelizeInstance.transaction()
        const file = File.build({
            file_name: fileName,
            file_reference: fileReference,
            date_surgery: new Date(dateSurgery).toISOString(),
            patient_id: patientId,
            region_id: regionId,
            clinic_id: clinicId,
            period_id: periodId,
            album_id: albumId // can be null, check if the param is null
        })
        await file.save({
            transaction: transaction
        })
        await transaction.commit()
        console.log(`The file ${file.file_name} with ID ${file.file_id} was saved to the database!`)
        return file
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Update the specified File in storage.
 * 
 * @param {*} fileId
 * @param {*} fileName
 * @param {*} fileReference
 * @param {*} date_surgery
 * @param {*} patientId
 * @param {*} regionId
 * @param {*} clinicId
 * @param {*} periodId
 * @param {*} albumId
 */
const updateFile = async (fileName, fileReference, dateSurgery, patientId, regionId, clinicId, periodId, albumId) => {
    try {
        transaction = await sequelizeInstance.transaction()
        const file = await File.update({
            file_name: fileName,
            file_reference: fileReference,
            date_surgery: dateSurgery,
            patient_id: patientId,
            region_id: regionId,
            clinic_id: clinicId,
            period_id: periodId,
            album_id: albumId // can be null, check if the param is null
        }, {
            where: {
                file_id: fileId
            },
            transaction: transaction
        })
        await transaction.commit()
        return file
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Remove the specified File from storage.  
 * 
 * @param {*} fileId
 */
const deleteFile = async fileId => {
    try {
        transaction = await sequelizeInstance.transaction()
        const file = await File.destroy({
            where: {
                file_id: fileId
            },
            transaction: transaction
        })
        await transaction.commit()
        return file
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

module.exports = {
    getFiles,
    getFileByName,
    createFile,
    updateFile,
    deleteFile
}