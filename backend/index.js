const express= require('express');
const cors= require('cors');
const http = require('http')
const socketio = require('socket.io')
const mongoose = require('mongoose');
const secretkey = "Priyanshu"
const path = require('path')
const moment = require('moment')

const app = express();
const server = http.createServer(app)
const io = socketio(server,{cors:{}})

function enterName(nam,message){
    return {
        nam,message,time:moment().format('h:mm a')
    };
}
// const name="abc"
// app.use(express.static(path.join(__dirname,'frontend')))

io.on('connection',socket =>{
    console.log('ws connected')
    // socket.emit('message',"welcome to chats")

    // socket.broadcast.emit('message',"a user entered")

    socket.on('joinchat',(obj) =>{
        socket.join(obj.roomname)

        socket.on('chatMessage',msgD =>{
            console.log(msgD)
            io.to(obj.roomname).emit('message',msgD)
        })
    })

    // socket.on('disconnect',()=>{
    //     io.emit('message','user left')
    // })
})

const userRoutes = require('./mvc/routes/user');
const tripRoutes = require('./mvc/routes/trips');
const reviewRoutes = require('./mvc/routes/reviews');
const abcRoutes = require('./mvc/routes/abc');
const chatRoutes = require('./mvc/routes/chats');
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
app.use('/stories',storyRoutes);
app.use('/chats',chatRoutes);

app.use('/getReview',reviewRoutes)

server.listen(3003);