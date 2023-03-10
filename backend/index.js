const express= require('express');
const cors= require('cors');
const mongoose = require('mongoose');
const secretkey = "Priyanshu"
const app = express();
const userRoutes = require('./mvc/routes/user');
const tripRoutes = require('./mvc/routes/trips');
const reviewRoutes = require('./mvc/routes/reviews');
const abcRoutes = require('./mvc/routes/abc');
const subscriptionRoutes = require('./mvc/routes/subscription')
const storyRoutes = require('./mvc/routes/stories');
const jwt = require('jsonwebtoken');
app.use(cors());
app.use(express.json());
app.use('/user',userRoutes);

app.use("/",async(req,res,next)=>{
try{
    var token = req.headers.token
    console.log("asdasdas",token);
    var validated = jwt.verify(token,secretkey)
    if(validated)
        next();
    else
        res.send("NOt Found");
}
catch(e){
    
    res.send("token not found");
}
})
app.use('/subscribe',subscriptionRoutes)
app.use('/abc', abcRoutes);
app.use('/trip',tripRoutes);
app.use('/stories',storyRoutes)
app.use('/getReview',reviewRoutes)

app.listen(3003);