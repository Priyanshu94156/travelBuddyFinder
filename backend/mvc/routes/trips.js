const express = require('express')
const routes = express.Router()

const upload = require('../middleware/upload')
const tripSave = require('../controllers/trips/tripsController')
const tripSearch=require('../controllers/search/tripsearch')
const { FilterRuleFilterSensitiveLog } = require('@aws-sdk/client-s3')

const count=require('../controllers/trips/count')
const fetchAll=require('../controllers/trips/fetchAllTrips')
const fetchChart=require('../controllers/trips/getTripChart')
const fetchGraph=require('../controllers/trips/getTripGraph')


routes.get('/getGraph',fetchGraph.getTripGraph)
routes.get('/getChart',fetchChart.getTripChart)
routes.get('/count',count.countTrips)
routes.get('/fetchAllTrips',fetchAll.fetchAllTrips)


routes.post('/newTripSave', upload.array('photos',5),tripSave.addTrips)
routes.get('/tripSearch', tripSearch.getTripDetails)
routes.get('/getAllTrips', tripSave.getAllTrips)
routes.post('/getOne',tripSave.getSpecificTrip)
routes.post('/tripRequest',tripSave.travellingRequest)
routes.post('/getRequestToOwner', tripSave.getRequestToOwner)
routes.post('/acceptOrReject',tripSave.acceptOrReject)
routes.post('/getUpcomingTrip', tripSave.getUpcomingTrip)
routes.post('/getTripsForProfile', tripSave.getTripsForProfile)

module.exports = routes