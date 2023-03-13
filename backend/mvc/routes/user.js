const express= require('express');
const routes = express.Router();

const allUsers=require('../controllers/user/fetchAll')
const userCount = require('../controllers/user/count')

const userDetails = require('../controllers/user/fetch')
const validate=require('../controllers/user/validate')
const addUser=require('../controllers/user/post')
const userUpdate = require('../controllers/user/userProfile')



routes.get('/userCount',userCount.countUsers);
routes.get('/fetchAllUsers',allUsers.fetchAllUsers)



routes.get('/fetchUser/:email',userDetails.fetchUser)
routes.post('/validate',validate.validate)
routes.post('/addUser',addUser.addUser)
routes.post('/userUpdate/:email',userUpdate.updateUser)
routes.post('/reqPush',addUser.reqPush)
routes.post('/getVisitors',addUser.getVisitors)

module.exports = routes;    