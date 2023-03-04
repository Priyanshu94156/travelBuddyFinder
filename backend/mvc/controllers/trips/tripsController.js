const express = require('express');
const tripCtrl = require("../../models/trips")
const user = require('../../models/userModel').userModel;


function addTrips(req, res){
    console.log("body",req.body)
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
            console.log(data)
            console.log("data",req.body)
            if(data.currentSubscription>0){

                user.updateOne({email:req.body.owner},{$set:{currentSubscription:data.currentSubscription-1}},(err,data)=>{
                    if(err){
                        res.send(err)
                    }else{
                        res.send(data)
                    }
                })
            }else{
                res.send('buy a subscription')
            }
        }
    }
    )
                
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