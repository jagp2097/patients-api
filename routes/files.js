const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const fileRoutes = require('../controllers/FileController')
const patientRoutes = require('../controllers/PatientController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const storePath = path.join(path.dirname(process.mainModule.filename), '/images')
        cb(null, storePath)
    },
    filename: (req, file, cb) => {
        const fileExtension = file.originalname.split('.')[1]
        cb(null, `${req.body.fileName}${Date.now()}.${fileExtension}`)
    }
})
const upload = multer({ storage: storage })

// Get files
router.get('/patient/:patientId/files', (req, res, next) => {
    const foundPatient = patientRoutes.getPatientById(req.params.patientId)

    foundPatient.then(foundPatient => {
        if (foundPatient)
            return fileRoutes.getFiles(foundPatient.patient_id)
        else {
            res.status(404).format({
                'application/json': () => {
                    res.send('Patient not found.')
                }
            })
        }
    })
    .then(files => {
        
    })
})

// Get a specified file
router.get('/patient/:patientId/file/:fileName', (req, res, next) => {
    const foundPatient = patientRoutes.getPatientById(req.params.patientId)

    foundPatient.then(foundPatient => {
        if (foundPatient)
            return fileRoutes.getFileByName(foundPatient.patient_id, req.params.fileName)
        else {
            res.status(404).format({
                'application/json': () => {
                    res.send('Patient not found.')
                }
            })
        }
    })
    .then(foundFile => {
        if (foundFile) {
            res.status(200).sendFile(`../images/${foundFile.file_reference}`)
        }
        else {
            res.status(404).format({
                'application/json': () => {
                    res.send('File not found.')
                }
            })
        }
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Create a new file
router.post('/patient/:patientId/files', upload.single('patient_file'), (req, res, next) => {
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
                    'application/json': () => {
                        res.send('Bad request: file name not provided.')
                    }
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
                'application/json': () => {
                    res.send('Patient not found.')
                }
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
router.put('/patient/:patientId/file/:fileId', (req, res, next) => {

})

// Delete a specified file
router.delete('/patient/:patientId/files/:fileId', (req, res, next) => {

})

module.exports = router