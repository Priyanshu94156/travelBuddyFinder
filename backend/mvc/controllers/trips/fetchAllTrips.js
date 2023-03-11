const trip = require('../../models/trips').tripModel;

function fetchAllTrips(req,res){
    trip.find((err, data) => {
        if (err) {
            console.log(err);
        } else {         
            res.send(data);
        }
    })
}

module.exports = {fetchAllTrips}