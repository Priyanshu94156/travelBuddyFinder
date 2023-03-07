const express = require('express');
const tripCtrl = require("../../models/trips")
const user = require('../../models/userModel').userModel;


function addTrips(req, res){
    pics=[]
   
    console.log("length",req.files.length)
    for (let i=0; i<req.files.length; i++){
        pics.push(req.files[i].location)
    }
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
        photos:pics
        // File:req.file.location
    })
    console.log("showing addTrip",addTripData)   
    addTripData.save((err,result)=>{
        if(err){
            console.log("error",err)
            res.send(err)
        }else{
            console.log("added")
        }
    })
    // console.log(req.body.)
    user.findOne({email:req.body.owner},(err,data)=>{
        if(err){
            res.send('error') 

        }
        else{
            // console.log("data",req.body)
            if(data.currentSubscription>0){

                user.updateOne({email:req.body.owner},{$set:{currentSubscription:data.currentSubscription-1}},(err,data)=>{
                    if(err){
                        res.send(err)
                    }else{
                        res.send(data)
                        console.log("data", data)
                    }
                })
            }else{
                res.send('buy a subscription')
            }
        }
    }
    )
}

// function studentToUserStep1(req, res){
//     UserCTRl.User.find({email:req.body.email},(err,docs) =>{
//         if(err){
//             console.log(err)
//         }else{
//             console.log(docs)
//             // let message = req.body.Message
//             // let Files = req.body.File
//             // let Linked = req.body.Linked
//             // console.log(typeof(req.body.Message))
//             console.log(req.body)
            
//             UserCTRl.User.updateOne({email:req.body.email},
//                 {$set:{isInstructor:"pending",Message:req.body.Message,File:req.file.location,Linked:req.body.Linked}},(err,docs) =>{
//                 if(err){
//                     console.log(err)
//                 }else{
//                     res.send(docs)
//                 }
//             })
//                 // res.send(docs)
//             }
//         })
// }


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