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
            console.log("back",data)
            if(data.currentSubscription>=0 || data.currentSubscription==null){
                data.currentSubscription=data.currentSubscription ?? 0;
                currentSubscription=data.currentSubscription+req.body.currentSubscription
                console.log("curr",currentSubscription)
                user.updateOne({email:req.body.email},{$set:{currentSubscription:currentSubscription},$push:{previousSubscriptions:req.body.currentSubscription}},(err,data)=>{
                    if(err){
                        res.send(err) 
                    }else{
                        console.log("hiiii",data)
                        res.send("you have successfully Subscribed")
                    }
                })
                
            }else{
               res.send("checkcode")
            }
        }
    })
}

module.exports = {addUser,getSubscription,subscribeValidation}