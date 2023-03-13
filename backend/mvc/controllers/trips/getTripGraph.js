const trip = require('../../models/trips').tripModel;


async function getTripGraph(req,res){
    try{
        let data=await trip.aggregate(
            [
                {
                    '$project': {
                        'startDate': 1, 
                        'endDate': 1
                    }
                }
            ]
        )
        res.send(data);
    }
    catch(err){
        console.log("err");
    }
}
module.exports={getTripGraph}