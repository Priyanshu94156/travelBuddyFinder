const { array } = require('../../middleware/upload');

const user = require('../../models/userModel').userModel;

function addUser(req,res){
    var newUser = new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phno: req.body.phno,
        age: req.body.age,
        gender: req.body.gender,
        currentSubscription:0
    })
    user.find({email:req.body.email},(err,data)=>{
        if(err){
            res.send('error') 
        }else{
            if(data.length==1){
                var response = {status:"exist"}
                res.send(JSON.stringify(response))

            }else{
                newUser.save((err, data) => {
                    if (err) {
                        var response = {status:"invalid 2",};
                    } else {
                        var response = {status:"valid",};
                    }
                    res.send(JSON.stringify(response))
                })
            }
        }
    })
}

function subscribeValidation(req,res){
    console.log("asd",req.body)
    user.findOne({email:req.body.email},(err,data)=>{
        if(err){
            res.send('error') 
        }else{
            console.log("data",data)
            console.log("your",data.currentSubscription)
            if(data.currentSubscription>=1){
                // var response = {message:"you have a subscription"}
                res.send("you have a subscription")
            }else{
                // var response = {message:"you don't have a subscription plan"}
                res.send("you don't have a subscription plan")
            }
        }
    })

}

async function getSubscription(req, res) {
    console.log(req.body)
    user.findOne({email:req.body.email},(err,data)=>{
        if(err){
            res.send('error') 

        }else{
            console.log(data.currentSubscription)
            if(data.currentSubscription>=0 || data.currentSubscription==null){
                currentSubscription=data.currentSubscription+req.body.currentSubscription
                user.updateOne({email:req.body.email},{$set:{currentSubscription:currentSubscription},$push:{previousSubscriptions:req.body.currentSubscription}},(err,data)=>{
                    if(err){
                        res.send(err) 
                    }else{
                        console.log(data)
                        res.send("you have successfully Subscribed")
                    }
                })
                
            }else{
               res.send("checkcode")
            }
        }
    })
}

function reqPush(req,res){
    console.log(req.body)
    user.findOne({email:req.body.email},(err,data)=>{
        if(err){
            console.log(err)
            res.send(err)
        }else{
            console.log(data)
            if(data.visitedUsers.length==0 || data.visitedUsers.length==null){
                 user.updateOne({email:req.body.email},{$push:{visitedUsers:req.body.reqEmail}},(data,err)=>{
                    if(err){
                        res.send(err)
                    }else{
                        res.send("added")
                    }
                 })

            }else{
            flag=0
            for(i=0;i<data.visitedUsers.length;i++){
                if(req.body.reqEmail==data.visitedUsers[i]){
                    res.send("already have you")
                    flag=1
                    break
                }
            }
            if(flag==0){
                user.updateOne({email:req.body.email},{$push:{visitedUsers:req.body.reqEmail}},(data,err)=>{
                    if(err){
                        res.send(err)
                    }else{
                        res.send("added")
                    }
                })

            }}
        }
    })
    user.findOne({email:req.body.reqEmail},(err,data)=>{
        if(err){
            console.log(err)
            res.send(err)
        }else{
            console.log(data)
            if(data.visitedUsers.length==0 || data.visitedUsers.length==null){
                 user.updateOne({email:req.body.reqEmail},{$push:{visitedUsers:req.body.email}},(data,err)=>{
                    if(err){
                        res.send(err)
                    }else{
                        res.send("added")
                    }
                 })
                 
            }else{
            flag=0
            for(i=0;i<data.visitedUsers.length;i++){
                if(req.body.email==data.visitedUsers[i]){
                    res.send("already have you")
                    flag=1
                    break
                }
            }
            if(flag==0){
                user.updateOne({email:req.body.reqEmail},{$push:{visitedUsers:req.body.email}},(data,err)=>{
                    if(err){
                        res.send(err)
                    }else{
                        res.send("added")
                    }
                })

            }}
        }
    })
}

function getVisitors(req,res){
    console.log(req.body)
    user.findOne({email:req.body.email},(err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data.visitedUsers)
        }
    })
}

module.exports = {addUser,getSubscription,subscribeValidation,reqPush , getVisitors}