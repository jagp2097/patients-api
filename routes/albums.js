const express = require('express')
const router = express.Router()
const albumRoutes = require('../controllers/AlbumController')
const patientRoutes = require('../controllers/PatientController')

// Get albums
router.get('/patient/:patientId/albums', (req, res, next) => {
    const foundPatient = findPatient(req.params.patientId)

    foundPatient.then(foundPatient => {
        if (foundPatient) 
            return albumRoutes.getAlbums(foundPatient.patient_id)
    
        else
            res.status(404).send('Patient not found.')
    })
    .then(albums => {
        res.status(200).json(albums)
    }).catch(error => {
        console.log(error)
        next(error)
    })
})

// Get a specified album
router.get('/patient/:patientId/album/:albumId', (req, res, next) => {
    const foundPatient = findPatient(req.params.patientId)

    foundPatient.then(foundPatient => {
        if (foundPatient)
            return albumRoutes.getAlbumById(req.params.albumId)
        else
            res.status(404).send('Patient not found.')
    })
    .then(album => {
        if (album)
            res.status(200).json(album)
        else
            res.status(404).send('Album not found.')
    }).catch(error => {
        console.log(error)
        next(error)
    })
})

// Create a new album
router.post('/patient/:patientId/albums', (req, res, next) => {
    const foundPatient = findPatient(req.params.patientId)
    const albumName = req.body.albumName

    if (albumName === '' || albumName === undefined) {
        res.status(400).send('Bad request: album name not provided.')
    }

    foundPatient.then(foundPatient => {
        if (foundPatient)
            return albumRoutes.createAlbum(foundPatient.patient_id, albumName)
        
        else
            res.status(404).send('Patient not found.')
    })
    .then(album => {
        if (album.errors) {
            res.status(400).send(`Bad request: ${album.errors[0].message}`)
        }
        res.status(201).json(album)
    }).catch(error => {
        console.log(error)
        next(error)
    })
})

// Update album
router.put('/patient/:patientId/album/:albumId', (req, res, next) => {
    const foundPatient = findPatient(req.params.patientId)
    const albumName = req.body.albumName
    
    if (albumName === '' || albumName === undefined) {
        res.status(400).send('Bad request: album name not provided.')
    }

    foundPatient.then(foundPatient => {
        if (foundPatient)
            return albumRoutes.getAlbumById(foundPatient.patient_id, req.params.albumId)

        else
            res.status(404).send('Patient not found.')
    })
    .then(foundAlbum => {
        if (foundAlbum)
            return albumRoutes.updateAlbum(foundAlbum.album_id, albumName)
        
        else 
            res.status(404).send('Album not found.')
    })
    .then(updatedAlbum => {
        res.status(201).json(updatedAlbum)
    }).catch(error => {
        console.log(error)
        next(error)
    })
})

// Delete a specified album
router.delete('/patient/:patientId/albums/:albumId', (req, res, next) => {
    const foundPatient = findPatient(req.params.patientId)

    foundPatient.then(foundPatient => {
        if (foundPatient)
            return albumRoutes.getAlbumById(foundPatient.patient_id, req.params.albumId)

        else
            res.status(404).send('Patient not found.')
    })
    .then(foundAlbum => {
        if (foundAlbum)
            return albumRoutes.deleteAlbum(foundAlbum.album_id)

        else
            res.status(404).send('Album not found.')
    })
    .then(album => {
        res.status(200).json(album)
    }).catch(error => {
        console.log(error)
        next(error)
    })
})

// Find patient
const findPatient = patientId => patientRoutes.getPatientById(patientId)