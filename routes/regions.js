const express = require('express')
const router = express.Router()
const regionRoutes = require('../controllers/RegionController')
const isAuth = require('../middlewares/is-auth')

// Get regions
router.get('/regions', isAuth, (req, res, next) => {
    const regions = regionRoutes.getRegions()
    regions.then(regions => {
        res.status(200).json(regions)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Get a specified region
router.get('/region/:regionId', isAuth, (req, res, next) => {
    const region = regionRoutes.getRegionById(req.params.regionId)
    region.then(region => {
        if (region) 
            res.status(200).json(region)
        else {
            res.status(404).format({
                'text/plain': () => res.send('Region not found.')
            })
        }
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Create a new region
router.post('/regions', isAuth, (req, res, next) => {
    const regionName = req.body.regionName.trim()

    if (regionName === '' || regionName === undefined) {
        res.status(400).format({
            'text/plain': () => res.send('Bad request: region name not provided.')
        })
        return
    }

    const region = regionRoutes.createRegion(regionName)
    region.then(region => {
        if (region.errors) {
            res.status(400).format({
                'text/plain': () => res.send(`Bad request: ${region.errors[0].message}`)
            })
            return
        }
        res.status(201).json(region)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Update the specified region
router.put('/region/:regionId', isAuth, (req, res, next) => {
    const foundRegion = regionRoutes.getRegionById(req.params.regionId)
    const regionName = req.body.regionName.trim()

    foundRegion.then(foundRegion => {
        if (foundRegion) {
            
            if (regionName === '' || regionName === undefined) {
                res.status(400).format({
                    'text/plain': () => res.send('Bad request: region name not provided.')
                })
                return
            }

            return regionRoutes.updateRegion(foundRegion.region_id, regionName)
        }

        else {
            res.status(404).format({
                'text/plain': () => res.send('Region not found.')
            })
        }
    })
    .then(updatedRegion => {
        if (updatedRegion.errors) {
            res.status(400).format({
                'text/plain': () => res.send(`Bad request: ${region.errors[0].message}`)
            })
            return
        }
        res.status(201).json(updatedRegion)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Delete a specified region
router.delete('/regions/:regionId', isAuth, (req, res, next) => {
    const foundRegion = regionRoutes.getRegionById(req.params.regionId)

    foundRegion.then(foundRegion => {
        if (foundRegion) {
            return regionRoutes.deleteRegion(foundRegion.region_id)
        }
        
        else {
            res.status(404).format({
                'text/plain': () => res.send('Region not found.')
            })
        }
    })
    .then(region => {
        res.status(200).json(region)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

module.exports = router