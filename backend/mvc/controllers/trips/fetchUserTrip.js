const trip = require("../../models/trips").tripModel;

function fetchTrip(req, res){
    trip.find({owner:req.params.email},(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    })
}

module.exports = {fetchTrip};   