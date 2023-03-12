const express= require('express');
const routes = express.Router();

// const uploadImage = require('../middleware/upload')
const userDetails = require('../controllers/user/fetch')
const allUsers=require('../controllers/user/fetchAll')
const validate=require('../controllers/user/validate')
const addUser=require('../controllers/user/post')
const userUpdate = require('../controllers/user/userProfile')
const userCount = require('../controllers/user/count')
routes.get('/fetchUser/:email',userDetails.fetchUser)
routes.get('/userCount',userCount.countUsers);
routes.get('/fetchAllUsers',allUsers.fetchAllUsers)

routes.post('/validate',validate.validate)
routes.post('/addUser',addUser.addUser)
routes.post('/userUpdate/:email',userUpdate.updateUser)
// routes.post('/userUpdate/:email',uploadImage.single("profile"),userUpdate.updateUser)
routes.post('/reqPush',addUser.reqPush)
routes.post('/getVisitors',addUser.getVisitors)

module.exports = routes;    