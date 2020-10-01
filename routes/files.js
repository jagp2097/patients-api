const express = require('express')
const router = express.Router()
const multer = require('multer')
const fileRoutes = require('../controllers/FileController')
const patientRoutes = require('../controllers/PatientController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../images')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}`)
    }
})
const upload = multer({ storage: storage })

// Get files
router.get('/patient/:patientId/files', (req, res, next) => {
    const foundPatient = patientRoutes.getPatientById(req.params.patientId)

    foundPatient.then(foundPatient => {
        if (foundPatient)
            return fileRoutes.getFiles(foundPatient.patient_id)
        else
            res.status(400).send('Patient not found.')
    })
    .then(files => {
        
    })
})

// Get a specified file
router.get('/patient/:patientId/file/:fileId', (req, res, next) => {

})

// Create a new file
router.post('/patient/:patientId/files', (req, res, next) => {

})

// Update the specified file
router.put('/patient/:patientId/file/:fileId', (req, res, next) => {

})

// Delete a specified file
router.delete('/patient/:patientId/files/:fileId', (req, res, next) => {

})

module.exports = router