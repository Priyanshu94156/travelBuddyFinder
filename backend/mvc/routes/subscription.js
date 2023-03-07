const express= require('express');
const routes = express.Router();

const user=require('../controllers/user/post')


routes.post('/getSubscription',user.getSubscription)
routes.post('/subscriptionValid',user.subscribeValidation)


module.exports = routes;    