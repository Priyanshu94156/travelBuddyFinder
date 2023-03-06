const userSearch = require("../../models/userModel").userModel;

const getUserDetails = async(req,res)=>{
    const {} = req.query;
    const queryObject={};

    if(){
        queryObject.from={$regex:, $options:"i"};
    }
    if(){
        queryObject.to={$regex:, $options:"i"};
    }
    const data=await trip.find(queryObject);
    res.status(200).json(data);
}
module.exports={getTripDetails}
