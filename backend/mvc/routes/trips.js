const express = require('express')
const routes = express.Router()

const tripSave = require('../controllers/trips/tripsController')
const tripSearch=require('../controllers/search/tripsearch')

routes.post('/newTripSave', tripSave.addTrips)
routes.get('/tripSearch', tripSearch.getTripDetails)
routes.get('/getAllTrips', tripSave.getAllTrips)

module.exports = routes