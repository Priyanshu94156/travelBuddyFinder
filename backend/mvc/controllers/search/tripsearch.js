const trip = require("../../models/trips").tripModel

const getTripDetails = async(req,res)=>{
    const {from,to} = req.query;
    const queryObject={};

    if(from){
        queryObject.from={$regex:from, $options:"i"};
    }
    if(to){
        queryObject.to={$regex:to, $options:"i"};
    }
    const data=await trip.find(queryObject);
    res.status(200).json(data);
}
module.exports={getTripDetails}
