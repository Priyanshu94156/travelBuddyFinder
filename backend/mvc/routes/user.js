const express= require('express');
const routes = express.Router();


const userDetails = require('../controllers/user/fetch')
const validate=require('../controllers/user/validate')
const addUser=require('../controllers/user/post')

routes.get('/fetchUser/:email',userDetails.fetchUser)
routes.post('/validate',validate.validate)
routes.post('/addUser',addUser.addUser)


module.exports = routes;    