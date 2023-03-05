const user = require('../../models/userModel').userModel;
const jwt = require("jsonwebtoken");
const secretkey = "Priyanshu"
const gentoken = (email)=>{
    var obj = {
        uid: email,
        time:Date.now()
    }
    const token = jwt.sign(obj , secretkey);
    return {token:token}
}
function  validate(req,res){
    // console.log(req.body)
    user.find({email:req.body.email,password:req.body.password},(err,data)=>{
        if(err){
            console.log("Error:"+err)
            res.send("Error")
        }else{
            // console.log("data:"+data)
            // console.log(data.username);
            if(data.length==1){
                const token = gentoken(req.body.email).token;
                var response = {
                    status:"valid",
                    email:req.body.email,
                    token:token
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