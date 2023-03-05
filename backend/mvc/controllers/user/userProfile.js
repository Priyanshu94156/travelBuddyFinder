const user = require('../../models/userModel').userModel;

function updateUser(req, res) {
    console.log(req.params.email)
    console.log(req.body);
    user.updateOne(
        { email: req.params.email },
        {
            $set:
                { phno: req.body.phno }
        },
        (err,data)=>{
            if(err){
                console.log(err);
                res.send(JSON.stringify({status:"not success"}));
            }else{
                 res.send(JSON.stringify({status:"success"}))
            }
        }
    );
}

module.exports = {updateUser}