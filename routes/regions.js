const express = require('express')
const router = express.Router()
const regionRoutes = require('../controllers/RegionController')

// Get regions
router.get('/regions', (req, res, next) => {
    const regions = regionRoutes.getRegions()
    regions.then(regions => {
        res.status(200).json(regions)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Get a specified region
router.get('/region/:regionId', (req, res, next) => {
    const region = regionRoutes.getRegionById(req.params.regionId)
    region.then(region => {
        if (region.length !== 0) 
            res.status(200).json(region)
        else
            res.status(404).send('Region not found.')
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Create a new region
router.post('/regions', (req, res, next) => {
    const regionName = req.body.regionName.trim()

    if (regionName === '' || regionName === undefined) {
        res.status(400).send('Bad request: region name not provided.')
        return
    }

    const region = regionRoutes.createRegion(regionName)
    region.then(region => {
        if (region.errors) {
            res.status(400).send(`Bad request: ${region.errors[0].message}`)
        }
        res.status(201).json(region)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Update the specified region
router.put('/region/:regionId', (req, res, next) => {
    const foundRegion = regionRoutes.getRegionById(req.params.regionId)
    const regionName = req.body.regionName.trim()

    foundRegion.then(foundRegion => {
        if (foundRegion.length !== 0) {
            
            if (regionName === '' || regionName === undefined) {
                res.status(400).send('Bad request: region name not provided.')
                return
            }

            return regionRoutes.updateRegion(foundRegion[0].region_id, regionName)
        }

        else
            res.status(404).send('Region not found.')
    })
    .then(updatedRegion => {
        if (updatedRegion.errors) {
            res.status(400).send(`Bad request: ${updatedRegion.errors[0].message}`)
        }
        res.status(201).json(updatedRegion)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

// Delete a specified region
router.delete('/regions/:regionId', (req, res, next) => {
    const foundRegion = regionRoutes.getRegionById(req.params.regionId)

    foundRegion.then(foundRegion => {
        if (foundRegion.length !== 0) {
            return regionRoutes.deleteRegion(foundRegion[0].region_id)
        }
        
        else
            res.status(404).send('Region not found.')
    })
    .then(region => {
        res.status(200).json(region)
    }).catch(error => {
        console.error(error)
        next(error)
    })
})

module.exports = router