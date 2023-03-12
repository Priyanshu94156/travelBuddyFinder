const trip = require('../../models/trips').tripModel;

function countTrips(req,res){
    trip.count({},(err,data)=>{
       if(err){
        console.log(err);
       }else{
        res.send(data.toString())
       }
    })

}

module.exports = {countTrips}