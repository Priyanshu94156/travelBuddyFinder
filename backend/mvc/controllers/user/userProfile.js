const user = require('../../models/userModel').userModel;

function updateUser(req, res) {
    console.log(req.params.email)
    console.log(req.body);
    // pics={};
    // pics.push(req.files.location)
    user.updateOne(
        { email: req.params.email },
        {
            $set:
                {  
                    // img:pics,
                    phno: req.body.phno ,
                    gender:req.body.gender,
                    height:req.body.height,
                    city:req.body.city,
                    name:req.body.name,
                    nationality:req.body.nationality,
                    smoking:req.body.smoking,
                    drinking:req.body.drinking,
                    description:req.body.description}
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