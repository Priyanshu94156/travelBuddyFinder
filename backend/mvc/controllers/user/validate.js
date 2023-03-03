const user = require('../../models/userModel').userModel;

function  validate(req,res){
    console.log(req.body)
    user.find({email:req.body.email,password:req.body.password},(err,data)=>{
        if(err){
            console.log("Error:"+err)
            res.send("Error")
        }else{
            console.log("data:"+data)
            // console.log(data.username);
            if(data.length==1){
                var response = {
                    status:"valid",
                    email:data.email,
                }
                // response = JSON.parse(response)
                res.send(JSON.stringify(response))
            }else{
                var response = { status:"invalid",username:''}
                res.send(JSON.stringify(response))
            }
        }
    })

}

module.exports = {validate}