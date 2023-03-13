const user = require('../../models/userModel').userModel;

function countUsers(req,res){
    user.count({},(err,data)=>{
       if(err){
        console.log(err);
       }else{
        res.send(data.toString())
       }
    })

}

module.exports = {countUsers}