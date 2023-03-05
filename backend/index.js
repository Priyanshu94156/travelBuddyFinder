const express= require('express');
const cors= require('cors');
const mongoose = require('mongoose');
const secretkey = "Priyanshu"
const app = express();
const userRoutes = require('./mvc/routes/user');
const tripRoutes = require('./mvc/routes/trips');
const abcRoutes = require('./mvc/routes/abc');
const jwt = require('jsonwebtoken');
app.use(cors());
app.use(express.json());
app.use('/user',userRoutes);

app.use("/",async(req,res,next)=>{
try{
    var token = req.headers.token
    console.log(token);
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

app.use('/abc', abcRoutes);
app.use('/trip',tripRoutes);

app.listen(3003);