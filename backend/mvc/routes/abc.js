const express= require('express');
const routes = express.Router();


const userDetails = require('../controllers/user/fetch')

routes.get('/fetchUser/:email',userDetails.fetchUser)



module.exports = routes;    