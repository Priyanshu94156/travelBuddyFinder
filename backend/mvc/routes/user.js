const express= require('express');
const routes = express.Router();


const userDetails = require('../controllers/user/fetch')
const validate=require('../controllers/user/validate')
const user=require('../controllers/user/post')

// routes.get('/fetchUser/:email',userDetails.fetchUser)
routes.post('/validate',validate.validate)
routes.post('/addUser',user.addUser)
routes.post('/getSubscription',user.getSubscription)
routes.post('/subscriptionValid',user.subscribeValidation)


module.exports = routes;    