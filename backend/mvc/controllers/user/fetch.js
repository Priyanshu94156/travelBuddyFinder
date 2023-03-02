const user = require("../../models/userModel").userModel;

// async function fetchUser(req,res){
//     try{
//         const user = await user.find(req.params.name);
//         res.status(200).json(user);
//     }catch(err){
//         res.status(500).json(err);
//     }
// }

function fetchUser(req, res){
    user.find({name:req.params.name},(err,user)=>{
        if(err){
            console.log(err);
        }else{
            res.send(user);
        }
    })
}

module.exports = {fetchUser};