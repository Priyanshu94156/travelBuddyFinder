const trip = require('../../models/trips').tripModel;
const user = require('../../models/userModel').userModel

async function getTripChart(req,res){
    try{

        let data=await user.aggregate(
            [
                 {
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
        console.log(data)
    }
    catch(err){
        console.log("err");
    }
}
module.exports={getTripChart}