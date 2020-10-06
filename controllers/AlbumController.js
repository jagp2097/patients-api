const Album = require('../models/Album')

const sequelizeInstance = require('../config/app')
let transaction

/**
 * Retrieve a listing of the Album instance.
 * 
 * @param {*} patientId 
 */
const getAlbums = async (patientId) => {
    try {
        transaction = await sequelizeInstance.transaction()
        const albums = await Album.findAll({
            where: {
                patient_id: patientId
            },
            transaction: transaction
       })
       await transaction.commit()
       return albums
    } catch (error) {   
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Retrieve a specified Album.
 * 
 * @param {*} patientId
 * @param {*} albumId
 */
const getAlbumById = async (patientId, albumId) => {
    try {
        transaction = await sequelizeInstance.transaction()
        const album = await Album.findOne({
            where: {
                patient_id: patientId,
                album_id: albumId
            },
            transaction: transaction            
        })
        await transaction.commit()
        return album
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Store a new created Role in storage.
 * 
 * @param {*} patientId
 * @param {*} albumName
 */
const createAlbum = async (patientId, albumName) => {
    try {
        transaction = await sequelizeInstance.transaction()
        const album = Album.build({
            album_name: albumName,
            patient_id: patientId
        })
        await album.save({
            transaction: transaction        
        })
        await transaction.commit()
        console.log(`The album ${album.album_name} with ID ${album.album_id} was created for the patient with ID ${patientId} was saved to the database!`)
        return album
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Update the specified Album in storage.
 * 
 * @param {*} albumId
 * @param {*} albumName
 */
const updateAlbum = async (albumId, albumName) => {
    try {
        transaction = await sequelizeInstance.transaction()
        const album = await Album.update({
            album_name: albumName
        }, {
            where: {
                album_id: albumId
            },
            transaction: transaction
        })
        await transaction.commit()
        console.log(`The album with ID ${albumId} was updated to the database!`)
        return album
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

/**
 * Delete the specified Album from storage.
 * 
 * @param {*} albumId
 */
const deleteAlbum = async (albumId) => {
    try {
        transaction = await sequelizeInstance.transaction()
        const album = await Album.destroy({
            where: {
                album_id: albumId
            },
            transaction: transaction
        })
        await transaction.commit()
        console.log(`The album with ID ${albumId} was deleted to the database!`)
        return album
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        return error
    }
}

module.exports = {
    getAlbums,
    getAlbumById,
    createAlbum,
    updateAlbum,
    deleteAlbum
}