const express = require('express')
const routes = express.Router()

const tripSave = require('../controllers/trips/tripsController')

routes.post('/newTripSave', tripSave.addTrips)

routes.get('/getAllTrips', tripSave.getAllTrips)

module.exports = routes