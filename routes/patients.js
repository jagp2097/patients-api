const express = require('express')
const router = express.Router()
const patientRoutes = require('../controllers/PatientController')

// Get patients
router.get('/patients', (req, res, next) => {
    const patients = patientRoutes.getPatients()
    
    patients.then(patients => {
        res.status(200).json(patients)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Get a specified patient
router.get('/patient/:patientId', (req, res, next) => {
    const patient = patientRoutes.getPatientById(req.params.patientId)

    patient.then(patient => {
        if (patient)
            res.status(200).json(patient)
        else {
            res.status(404).format({
                'text/plain': () => res.send('Patient not found.')
            })
        }
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Create a new patient
router.post('/patients', (req, res, next) => {
    const firstName = req.body.firstName.trim()
    const lastName = req.body.lastName.trim()
    const birthday = req.body.birthday.trim()
    const email = req.body.email.trim()

    if (firstName === '' || firstName === undefined) {
        res.status(400).format({
            'text/plain': () => res.send('Bad request: first name not provided.')
        })
        return
    }

    if (lastName === '' || lastName === undefined) {
        res.status(400).format({
            'text/plain': () => res.send('Bad request: last name not provided.')
        })
        return
    }

    if (birthday === '' || birthday === undefined) {
        res.status(400).format({
            'text/plain': () => res.send('Bad request: birthday not provided.')
        })
        return
    }

    if (email === '' || email === undefined) {
        res.status(400).format({
            'text/plain': () => res.send('Bad request: email not provided.')
        })
        return
    }

    const patient = patientRoutes.createPatient(firstName, lastName, birthday, email)
    patient.then(newPatient => {
        if (newPatient.errors) {
            res.status(400).format({
                'text/plain': () => res.send(`Bad request: ${newPatient.errors[0].message}`)
            })
            return
        }
        res.status(201).json(newPatient)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Update the specified patient
router.put('/patient/:patientId', (req, res, next) => {
    const foundPatient = patientRoutes.getPatientById(req.params.patientId)
    const firstName = req.body.firstName.trim()
    const lastName = req.body.lastName.trim()
    const birthday = req.body.birthday.trim()
    const email = req.body.email.trim()

    foundPatient.then(foundPatient => {
        if (foundPatient) {
            if (firstName === '' || firstName === undefined) {
                res.status(400).format({
                    'text/plain': () => res.send('Bad request: first name not provided.')
                })
                return
            }
        
            if (lastName === '' || lastName === undefined) {
                res.status(400).format({
                    'text/plain': () => res.send('Bad request: last name not provided.')
                })
                return
            }
        
            if (birthday === '' || birthday === undefined) {
                res.status(400).format({
                    'text/plain': () => res.send('Bad request: birthday not provided.')
                })
                return
            }
        
            if (email === '' || email === undefined) {
                res.status(400).format({
                    'text/plain': () => res.send('Bad request: email not provided.')
                })
                return
            }

            return patientRoutes.updatePatient(foundPatient.patient_id, firstName, lastName, birthday, email)
        }
        else {
            res.status(404).format({
                'text/plain': () => res.send('Patient not found.')
            })
        }
    }).then(updatedPatient => {
        if (updatedPatient.errors) {
            res.status(400).format({
                'text/plain': () => res.send(`Bad request: ${newPatient.errors[0].message}`)
            })
            return
        }
        res.status(201).json(updatedPatient)
    }).catch(error => {
        next(error)
    })
})

// Delete a specified patient
router.delete('/patients/:patientId', (req, res, next) => {
    const foundPatient = patientRoutes.getPatientById(req.params.patientId)

    foundPatient.then(foundPatient => {
        if (foundPatient) 
            return patientRoutes.deletePatient(foundPatient.patient_id)
        
        else {
            res.status(404).format({
                'text/plain': () => res.send('Patient not found.')
            })
        }
    })
    .then(patient => {
        res.status(200).json(patient)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

module.exports = router