const express = require('express')
const router = express.Router()
const clinicRoutes = require('../controllers/ClinicController')

// Get clinics
router.get('/clinics', (req, res, next) => {
    const clinics = clinicRoutes.getClinics()
    clinics.then(clinics => {
        res.status(200).json(clinics)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Get a specified clinic
router.get('/clinic/:clinicId', (req, res, next) => {
    const clinic = clinicRoutes.getClinicById(req.params.clinicId)
    clinic.then(clinic => {
        if (clinic) 
            res.status(200).json(clinic)
        else {
            res.status(404).format({
                'text/plain': () => res.send('Clinic not found.')
            })
        }
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Create a new clinic
router.post('/clinics', (req, res, next) => {
    const clinicName = req.body.clinicName.trim()

    if (clinicName === '' || clinicName === undefined) {
        res.status(400).format({
            'text/plain': () => res.send('Bad request: clinic name not provided.')
        })
        return
    }

    const clinic = clinicRoutes.createClinic(clinicName)
    clinic.then(clinic => {
        if (clinic.errors) {
            res.status(400).format({
                'text/plain': () => res.send(`Bad request: ${clinic.errors[0].message}`)
            })
            return
        }
        res.status(201).json(clinic)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Update the specified clinic
router.put('/clinic/:clinicId', (req, res, next) => {
    const foundClinic = clinicRoutes.getClinicById(req.params.clinicId)
    const clinicName = req.body.clinicName.trim()

    foundClinic.then(foundClinic => {
        if (foundClinic) {

            if (clinicName === '' || clinicName === undefined) {
                res.status(400).format({
                    'text/plain': () => res.send('Bad request: clinic name not provided.')
                })
                return
            }

            return clinicRoutes.updateClinic(foundClinic.clinic_id, clinicName)
        }

        else {
            res.status(404).format({
                'text/plain': () => res.send('Clinic not found.')
            })
        }
    })
    .then(updatedClinic => {
        if (updatedClinic.error) {
            res.status(400).format({
                'text/plain': () => res.send(`Bad request: ${updatedClinic.errors[0].message}`)
            })
            return
        }
        res.status(201).json(updatedClinic)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Delete a specified clinic
router.delete('/clinics/:clinicId', (req, res, next) => {
    const foundClinic = clinicRoutes.getClinicById(req.params.clinicId)

    foundClinic.then(foundClinic => {
        if (foundClinic)
            return clinicRoutes.deleteClinic(foundClinic.clinic_id)
        else {
            res.status(404).format({
                'text/plain': () => res.send('Clinic not found.')
            })
        }
    })
    .then(clinic => {
        res.status(200).json(clinic)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

module.exports = router