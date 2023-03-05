const express = require('express')
const routes = express.Router()

const upload = require('../middleware/upload')
const tripSave = require('../controllers/trips/tripsController')

routes.post('/newTripSave', upload.array('photos',5),tripSave.addTrips)

routes.get('/getAllTrips', tripSave.getAllTrips)

module.exports = routes