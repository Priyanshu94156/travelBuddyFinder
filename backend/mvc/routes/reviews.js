const express= require('express');
const routes = express.Router();

const user=require('../controllers/user/reviews')


routes.post('/',user.getReview)
routes.post('/save',user.saveReviewToDatabase)


module.exports = routes;    