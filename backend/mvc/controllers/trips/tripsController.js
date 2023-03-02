const tripCtrl = require("../../models/trips")



async function addTrips(req, res){
    //if (type(req.body.owner)==String){}
    let addTripData = tripCtrl.tripModel({
        owner:req.body.owner,
        tripName:req.body.tripName,
        description:req.body.description,
        from:req.body.from,
        to:req.body.to,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        flexible:req.body.flexible,
        preferences:req.body.preferences,
        keywords:req.body.keywords,
        travellingCost:req.body.travellingCost,
        photos:req.body.photos
    })

    console.log(addTripData)   
    await addTripData.save((err,result)=>{
        if(err){
            res.send(err)
        }else{
            console.log("added")
            res.send("new Trip added successfully")
        }
    })
}

function getAllTrips(req,res){
     tripCtrl.tripModel.find({},(err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
}

module.exports = {addTrips,getAllTrips}