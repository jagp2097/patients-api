const express = require('express')
const router = express.Router()
const periodRoutes = require('../controllers/SurgicalPeriodController')

// Get surgical periods
router.get('/surgical-periods', (req, res, next) => {
    const periods = periodRoutes.getSurgicalPeriods()
    periods.then(periods => {
        res.status(200).json(periods)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Get a specified surgical period
router.get('/surgical-period/:periodId', (req, res, next) => {
    const period = periodRoutes.getSurgicalPeriodById(req.params.periodId)
    period.then(period => {
        if (period.length !== 0)
            res.status(200).json(period)
        else {
            res.status(404).format({
                'application/json': () => {
                    res.send('Surgical period not found.')
                }
            })
        }
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Create a new surgical period
router.post('/surgical-periods', (req, res, next) => {
    const periodName = req.body.periodName.trim()

    if (periodName === '' || periodName === undefined) {
        res.status(400).format({
            'application/json': () => {
                res.send('Bad request: surgical period name not provided.')
            }
        })
        return
    }

    const period = periodRoutes.createSurgicalPeriod(periodName)
    period.then(period => {
        if (period.errors) {
            res.status(400).format({
                'application/json': () => {
                    res.send(`Bad request: ${period.errors[0].message}`)
                }
            })
        }
        res.status(201).json(period)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Update the specified surgery period
router.put('/surgical-period/:periodId', (req, res, next) => {
    const foundPeriod = periodRoutes.getSurgicalPeriodById(req.params.periodId)
    const periodName = req.body.periodName.trim()

    foundPeriod.then(foundPeriod => {
        if (foundPeriod.length !== 0) {

            if (periodName === '' || periodName === undefined) {
                res.status(400).format({
                    'application/json': () => {
                        res.send('Bad request: surgical period name not provided.')
                    }
                })      
                return
            }

            return periodRoutes.updateSurgicalPeriod(foundPeriod[0].period_id, periodName)
        }
    })
    .then(updatedPeriod => {
        if (updatedPeriod.error) {
            res.status(400).format({
                'application/json': () => {
                    res.send(`Bad request: ${updatedPeriod.errors[0].message}`)
                }
            })  
        }
        res.status(201).json(updatedPeriod)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Delete a specified surgical period
router.delete('/surgical-periods/:periodId', (req, res, next) => {
    const foundPeriod = periodRoutes.getSurgicalPeriodById(req.params.periodId)

    foundPeriod.then(foundPeriod => {
        if (foundPeriod.length !== 0)
            return periodRoutes.deleteSurgicalPeriod(foundPeriod[0].period_id)
        else {
            res.status(400).format({
                'application/json': () => {
                    res.send('Surgical period not found.')
                }
            })
        }
    })
    .then(period => {
        res.status(200).json(period)
    }).catch(error => {
        console.error(error)
        next(error)
    })
}) 

module.exports = router