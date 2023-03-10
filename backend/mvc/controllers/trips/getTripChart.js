const trip = require('../../models/trips').tripModel;


async function getTripChart(req,res){
    try{
        let data=await trip.aggregate(
            [
                {
                  '$match': {
                    'email': req.body.email
                  }
                }, {
                  '$addFields': {
                    'LastEle': {
                      '$last': '$previousSubscriptions'
                    }
                  }
                }, {
                  '$project': {
                    'LastEle': 1
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
module.exports={getTripChart}