const jsdom = require('jsdom')
const JSDOM = {jsdom}
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

function check(email,password){
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValidEmail = emailRegex.test(email);
    console.log(isValidEmail); // true
}


function  validate(req,res){
    // // console.log(req.body)
    // var email=new JSDOM(req.body.email);
	// var password=new JSDOM(req.body.password);

    if(req.body.email=="" || req.body.password==""){}

    else if(req.body.email=="admin@dbox.com" && req.body.password=="admin"){
        const token = gentoken(req.body.email).token;
                var response = {
                    status:"admin",
                    email:req.body.email,
                    token:token
                }
                // response = JSON.parse(response)
                res.send(JSON.stringify(response))
    }else{
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

}

module.exports = {validate}