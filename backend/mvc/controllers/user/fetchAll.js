const user = require('../../models/userModel').userModel;

function fetchAllUsers(req,res){
    user.find((err, data) => {
        if (err) {
            console.log(err);
        } else {
            //console.log(data)
            res.send(data);
        }
    })
}

module.exports = {fetchAllUsers}