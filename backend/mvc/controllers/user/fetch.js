const user = require("../../models/userModel").userModel;

function fetchUser(req, res){
    user.find({email:req.params.email},(err,user)=>{
        if(err){
            console.log(err);
        }else{
            res.send(user);
        }
    })
}

module.exports = {fetchUser};   