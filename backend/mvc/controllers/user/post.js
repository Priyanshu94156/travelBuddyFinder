const user = require('../../models/userModel').userModel;

function addUser(req,res){
    var newUser = new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phno: req.body.phno,
        age: req.body.age,
        gender: req.body.gender
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

module.exports = {addUser}