const Album = require('../models/Album')

/**
 * Retrieve a listing of the Album instance.
 * 
 * @param {*} patientId 
 */
const getAlbums = async (patientId) => {
    try {
        const albums = await Album.findAll({
            where: {
                patient_id: patientId
            }
        })
        return albums
    } catch (error) {   
        console.error(error)
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
        const album = await Album.findAll({
            where: {
                patient_id: patientId,
                album_id: albumId
            }
        })
        return album
    } catch (error) {
        console.error(error)
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
        const album = Album.build({
            album_name: albumName,
            patient_id: patientId
        })
        await album.save()
        console.log(`The album ${album.album_name} with ID ${album.album_id} was created for the patient with ID ${patientId} was saved to the database!`)
        return album
    } catch (error) {
        console.error(error)
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
        const album = await Album.update({
            album_name: albumName
        }, {
            where: {
                album_id: albumId
            }
        })
        return album
    } catch (error) {
        console.error(error)
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
        const album = await Album.destroy({
            where: {
                album_id: albumId
            }
        })
        console.log(`The album with ID ${albumId} was deleted to the database!`)
        return album
    } catch (error) {
        console.error(error)
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