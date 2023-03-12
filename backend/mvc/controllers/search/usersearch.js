const userSearch = require("../../models/userModel").userModel;

const getUserDetails = async(req,res)=>{
    const {age_low,age_high,height_low,height_high,smoking,drinking,preferences} = req.query;
    const queryObject={};
//     if(age_low||age_high){
    // if(age_high){
    //     queryObject.age={$lte:parseInt(age_high)};
    // }
    // if(age_low){
    //     queryObject.age={$gte:parseInt(age_low)};
    // }
// }
// if (age_high&&age_low){
//     queryObject.age={$and:[{$lte:parseInt(age_high)},{$gte:parseInt(age_low)}]};
// }
    // if(height_low<=220&&height_high>=150){
    //     queryObject.height={$lte:parseInt(height_high)};
    //     queryObject.height={$gte:parseInt(height_low)};
    // }
    var data1;
    if(age_low>=18 && age_high<=75  ){
        userSearch.find({age:{$lte:age_high,$gte:age_low}},(err,data)=>{
            if(err){
                console.log(err);
                res.status(500).json({
                    message:err
                });
            }else{
                data1=json(data);
            }
        });
        // console.log(array+" inside the array");
        // queryObject.age=array[0];

    // }
    // if(age_low>=18 && age_high<=75 && height_high<=220&&height_low>=150 ){
    //     queryObject.age={age:{$lte:age_high,$gte:age_low}}
    }

    if(smoking){
        queryObject.smoking=smoking;
    }
    if(drinking){
        queryObject.drinking=drinking;
    }
    if(preferences){
        if(preferences=="Any"){
            queryObject.preferences={$regex:"male", $options:"i"};
        }else{
        queryObject.preferences=preferences;
        }    }
    const data=await userSearch.find(queryObject);
    res.status(200).json(data);
}
module.exports={getUserDetails}
