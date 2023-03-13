const trip = require("../../models/trips").tripModel

const getTripDetails = async(req,res)=>{
    const {from,to,startDate,endDate,preferences} = req.query;
    const queryObject={};

    const myregex_from=new RegExp(`^${from}`,"i")
    const myregex_to=new RegExp(`^${to}`,"i")


    if(from){
        queryObject.from={$regex:myregex_from};
    }
    if(to){
        queryObject.to={$regex:myregex_to};
    }

    if(startDate){
        queryObject.startDate={$gte:startDate};
    }
    if(endDate){
        queryObject.endDate={$lte:endDate};
    }
    if(preferences){
        // console.log(preferences);
        if(preferences=="Any"){
            queryObject.preferences={$regex:"male", $options:"i"};
        }else{
        queryObject.preferences=preferences;
        }
    }
    console.log(queryObject)

    const data=await trip.find(queryObject);
    res.status(200).json(data);
}
module.exports={getTripDetails}
