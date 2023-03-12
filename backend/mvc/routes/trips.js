const express = require('express')
const routes = express.Router()

const upload = require('../middleware/upload')
const tripSave = require('../controllers/trips/tripsController')
const tripSearch=require('../controllers/search/tripsearch')

routes.post('/newTripSave', upload.array('photos',5),tripSave.addTrips)
routes.get('/tripSearch', tripSearch.getTripDetails)
routes.get('/getAllTrips', tripSave.getAllTrips)
routes.post('/getRequestToOwner', tripSave.getRequestToOwner)

module.exports = routes