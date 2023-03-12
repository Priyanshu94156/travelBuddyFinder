const express = require('express')
const routes = express.Router()

const upload = require('../middleware/upload')
const tripSave = require('../controllers/trips/tripsController')
const tripSearch=require('../controllers/search/tripsearch')
const details = require('../controllers/trips/getTripDetails')
const count=require('../controllers/trips/count')
const fetchAll=require('../controllers/trips/fetchAllTrips')
const fetchChart=require('../controllers/trips/getTripChart')
const fetchGraph=require('../controllers/trips/getTripGraph')
const fetchUserTrip=require('../controllers/trips/fetchUserTrip')

routes.get('/fetchUserTrip/:email', fetchUserTrip.fetchTrip)
routes.get('/getGraph',fetchGraph.getTripGraph)
routes.get('/getChart',fetchChart.getTripChart)
routes.get('/count',count.countTrips)
routes.get('/fetchAllTrips',fetchAll.fetchAllTrips)
routes.post('/newTripSave', upload.array('photos',5),tripSave.addTrips)
routes.get('/getTripDetails/:id', details.tripDetails)
routes.get('/tripSearch', tripSearch.getTripDetails)
routes.get('/getAllTrips', tripSave.getAllTrips)

module.exports = routes