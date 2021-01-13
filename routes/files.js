const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const fileRoutes = require('../controllers/FileController')
const patientRoutes = require('../controllers/PatientController')
const fs = require('fs')
const isAuth = require('../middlewares/is-auth')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const storePath = path.join(path.dirname(require.main.filename), '/images')
        cb(null, storePath)
    },
    filename: (req, file, cb) => {
        const fileExtension = file.originalname.split('.')[1].toLowerCase()
        cb(null, `${req.body.fileName}${Date.now()}.${fileExtension}`)
    }
})
const upload = multer({ storage: storage })

// Get files
router.get('/files', isAuth, (req, res, next) => {
    const files = fileRoutes.getFiles()

    files.then(files => {
        res.status(200).json(files)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Get files by patient
router.get('/patient/:patientId/files', isAuth, (req, res, next) => {
    const foundPatient = patientRoutes.getPatientById(req.params.patientId)

    foundPatient.then(foundPatient => {
        if (foundPatient)
            return fileRoutes.getFiles(foundPatient.patient_id)
        else {
            res.status(404).format({
                'text/plain': () => res.send('Patient not found.')
            })
        }
    })
    .then(files => {
        res.status(200).json(files)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Get a specified file
router.get('/patient/:patientId/file/:fileName', isAuth, (req, res, next) => {
    const foundPatient = patientRoutes.getPatientById(req.params.patientId)

    foundPatient.then(foundPatient => {
        if (foundPatient)
            return fileRoutes.getFileByName(foundPatient.patient_id, req.params.fileName)
        else {
            res.status(404).format({
                'text/plain': () => res.send('Patient not found.')
            })
        }
    })
    .then(foundFile => {
        if (foundFile) {
            res.status(200).json(foundFile)
            // res.status(200).sendFile(`${path.join(path.dirname(require.main.filename), `/images/${foundFile.file_reference}`)}`)
        }
        else {
            res.status(404).format({
                'text/plain': () => res.send('File not found.')
            })
        }
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Create a new file
router.post('/patient/:patientId/files', isAuth, upload.single('patient_file'), (req, res, next) => {
    const foundPatient = patientRoutes.getPatientById(req.params.patientId)
    const fileName = req.body.fileName.trim()
    const dateSurgery = req.body.dateSurgery.trim()
    const regionId = req.body.regionId.trim()
    const clinicId = req.body.clinicId.trim()
    const periodId = req.body.periodId.trim()
    let albumId = req.body.albumId.trim()
    
    foundPatient.then(foundPatient => {
        if (foundPatient) {

            if (fileName === '' || fileName === undefined) {
                res.status(400).format({
                    'text/plain': () => res.send('Bad request: file name not provided.')
                })
            }

            if (albumId === '' || albumId === undefined) {
                albumId = null
            }

            return fileRoutes.createFile(fileName, req.file.filename, dateSurgery, 
                foundPatient.patient_id, regionId, clinicId, periodId, albumId)
        }
        else {
            res.status(404).format({
                'text/plain': () => res.send('Patient not found.')
            })
        }
    })
    .then(file => {
        if (file.errors) {
            res.status(400).send(`Bad request: ${file.errors[0].message}`)
        }
        res.status(201).json(file)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Update the specified file
router.put('/patient/:patientId/file/:fileId', isAuth, (req, res, next) => {
    const foundPatient = patientRoutes.getPatientById(req.params.patientId)
    const fileName = req.body.fileName.trim()
    const dateSurgery = req.body.dateSurgery.trim()
    const regionId = req.body.regionId.trim()
    const clinicId = req.body.clinicId.trim()
    const periodId = req.body.periodId.trim()
    let albumId = req.body.albumId.trim()

    foundPatient.then(foundPatient => {
        if (foundPatient) {

            if (fileName === '' || fileName === undefined) {
                res.status(400).format({
                    'text/plain': () => res.send('Bad request: file name not provided.')
                })
            }

            if (albumId === '' || albumId === undefined) {
                albumId = null
            }

            return fileRoutes.getFileById(req.params.patientId, req.params.fileId)
        }
        else {
            res.status(404).format({
                'text/plain': () => res.send('Patient not found.')
            })
        }
    })
    .then(foundFile => {
        if (foundFile)
            return fileRoutes.updateFile(foundFile.file_id, fileName, dateSurgery, foundFile.patient_id, regionId, clinicId, periodId, albumId)

        else {
            res.status(404).format({
                'text/plain': () => res.send('File not found.')
            })
        }
        
    })
    .then(updatedFile => {
        if (updatedFile.errors) {
            res.status(400).send(`Bad request: ${updatedFile.errors[0].message}`)
        }
        res.status(201).json(updatedFile)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Delete a specified file
router.delete('/patient/:patientId/files/:fileId', isAuth, (req, res, next) => {
    const foundPatient = patientRoutes.getPatientById(req.params.patientId)
    
    foundPatient.then(foundPatient => {
        if (foundPatient) {
            return fileRoutes.getFileById(req.params.patientId, req.params.fileId)
        }
        else {
            res.status(404).format({
                'text/plain': () => res.send('Patient not found.')
            })
        }
    })
    .then(foundFile => {
        if (foundFile) {
            try {
                fs.unlinkSync(path.join(path.dirname(require.main.filename), `/images/${foundFile.file_reference}`))
                return fileRoutes.deleteFile(foundFile.patient_id, foundFile.file_id)
            } catch (error) {
                console.error(error)
            }
        }
        else {
            res.status(404).format({
                'text/plain': () => res.send('File not found.')
            })
        }
    })
    .then(file => {
        res.status(200).json(file)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

module.exports = router