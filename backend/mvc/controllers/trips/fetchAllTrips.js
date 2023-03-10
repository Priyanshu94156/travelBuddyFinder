const trip = require('../../models/trips').tripModel;

function fetchAllTrips(req,res){
    trip.find((err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data)
            for(let i=0;i <data.length;i++){
                // console.log("runnning");
                console.log((data[i].startDate));
                data[i].startDate = (data[i].startDate);
                console.log(data[i].startDate);

            }
            res.send(data);
        }
    })
}

module.exports = {fetchAllTrips}