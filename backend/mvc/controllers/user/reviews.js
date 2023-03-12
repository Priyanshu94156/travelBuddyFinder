const express = require('express');
const tripCtrl = require("../../models/trips")
const user = require('../../models/userModel').userModel;




async function getReview(req, res){
    console.log(req.body)
    const data = await (await user.find({email:req.body.email}).populate('trips'))
    let finishedTrips = []
    console.log(data)
    for(let i = 0; i < data[0].trips.length; i++){
        // if(data[0].trips[i].endDate < )
        // console.log("sdfsd",data[0].trips[i].startDate)
        if(new Date(Date()) > data[0].trips[i].endDate){
            console.log(data[0].trips[i])
            const toReview = {
                tripName: data[0].trips[i].tripName,
                email: data[0].trips[i].owner,
                objectId: data[0].trips[i]._id,
                members: data[0].trips[i].members
            }
            finishedTrips.push(toReview)
        }
    }
    res.send(finishedTrips)
}

function saveReviewToDatabase(req, res){
    const review = req.body.review
    const senderEmail = req.body.senderEmail
    const receiverEmail = req.body.receiverEmail
    const tripName = req.body.tripName
    const toPush = {
        tripName: tripName,
        review: review,
        senderEmail: senderEmail
    }
    user.updateOne({email:receiverEmail}, {$push:{reviews:toPush}},(err,result) =>{
        if(err) {
            console.log(err)
            res.send(err)
        }else{
            console.log(result)
            res.send(result)
        }
    })
    
}

module.exports ={getReview, saveReviewToDatabase}