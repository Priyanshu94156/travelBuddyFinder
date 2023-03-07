const trip = require("../../models/trips").tripModel

const getTripDetails = async(req,res)=>{
    const {from,to,startDate,endDate,preferences} = req.query;
    const queryObject={};

    if(from){
        queryObject.from={$regex:from, $options:"i"};
    }
    if(to){
        queryObject.to={$regex:to, $options:"i"};
    }
    if(startDate){
        queryObject.startDate={$gte:startDate};
    }
    if(endDate){
        queryObject.endDate={$lte:endDate};
    }
    if(preferences){
        queryObject.preferences={$regex:preferences, $options:"i"};
    }
    console.log(queryObject)

    const data=await trip.find(queryObject);
    res.status(200).json(data);
}
module.exports={getTripDetails}
