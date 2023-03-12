const express = require('express');
const { object } = require('webidl-conversions');
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
        var flag = 1
    user.find({email: req.body.owner}, (err,data)=>{
        console.log(data)
        if(data[0].tripTime != undefined){

        var times = data[0].tripTime
        for(var i=0;i<times.length;i++){
            console.log(times[i].startDate, " ", times[i].endDate)
            s = new Date(req.body.startDate)
            e = new Date(req.body.endDate)
            console.log(s, " ", e)
            if(flag == 1){
                if((s >= times[i].startDate && s <= times[i].endDate)||(e >= times[i].startDate && e <= times[i].endDate)){
                    flag = 0
                    res.send("Cant overlap 2 trips")
                }
            }
            if(flag == 0) break
        }
    }

    if(flag == 1){
        console.log("flagggggg", flag)
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
                            console.log("data", data)
                            addTripData.save((err,result)=>{
                                if(err){
                                    console.log("error",err)
                                    res.send(err)
                                }else{
                                    // console.log(result._id)
                                    console.log("added")
                                    // console.log(result)
                                    timess = {startDate: result.startDate, endDate: result.endDate}
                                    user.updateOne({email:result.owner}, {$push:{tripTime:{"startDate":result.startDate, "endDate":result.endDate}}}, (err,ans) =>{
                                        if(err){
                                            console.log("sdfsdf",err)
                                            res.send(err)
                                        }else{
                    
                                            res.send("permission granted")
                                        }
                                    })
                                    user.updateOne({email:result.owner},{$push:{trips:result._id}},(err, res)=>{
                                        if(err){
                                            console.log(err)
                                            res.send(err)
                                        }else{
                                            console.log("done")
                                        }
                                    })
                                }
                            })
                        }
                    })
                }else{
                    res.send('buy a subscription')
                }
            }
        }
        )
        // console.log(req.body.)
    }
})
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

async function getSpecificTrip(req,res){
    try{
    console.log("hello",req.body)
    console.log(req.body.tripName)
    let trip = await tripCtrl.tripModel.findOne({owner:req.body.owner,tripName:req.body.tripName})
    if(!trip){
        res.send("no data found")
    }
    else{
        res.send(trip)
    }
    }
    catch(e){
        res.send(e)
    }
}

async function travellingRequest(req,res){
    try{
        console.log(req.body)
        //tripName , Owner , email ,message ,if requested then activate this push into requested requests,
        //in users add the trip to  requested trips  
        //if accepts the write another function to push into members list we need to show the user whether it is accepted or rejected 
        // or we need to store the trip id or name with the status 
        let messages_info={
            message:req.body.message,
            email:req.body.email
        }
        console.log(messages_info)
        let request = await tripCtrl.tripModel.findOneAndUpdate({owner:req.body.owner,tripName:req.body.tripName},{$push:{messages_info:messages_info,requestedMembers:req.body.email}})
        if (!request){
            console.log("no trip")
            res.send("no trip available")
        }
        else{
            console.log("updated")
            res.send("updated trip")
        }
    }
    catch(e){
        res.send(e)
    }
}


async function getRequestToOwner(req,res){
    try{
        console.log(req.body)
        email = req.body.email
        let request = await tripCtrl.tripModel.find({owner:email})
        if(!request){
            res.send("Not Found")
        }
        else{
            res.send(request)
        }
    }
    catch(e){
        res.send(e)
    }

}


async function acceptOrReject(req,res){
    try{
        console.log(req.body)
        // task , object, email
        if (req.body.task=="Approve"){
            let tasked = await tripCtrl.tripModel.findOneAndUpdate({_id:req.body._id},{$pull:{requestedMembers:req.body.email},$push:{members:req.body.email}})
            if (!tasked){
                res.send("Approve not Found")
            }else{
                res.send(tasked)
            }
            let userUpdate = await user.findOneAndUpdate({email:req.body.email},{$push:{trips:req.body._id}})
            if(!userUpdate){
                console.log("err")
            }
            else{
                console.log("Approve success")
            }
        }
        else if (req.body.task=="Decline"){
            let rejectedTasked = await tripCtrl.tripModel.findOneAndUpdate({_id:req.body._id},{$pull:{requestedMembers:req.body.email},$push:{blackList:req.body.email}})
            if (!rejectedTasked){
                res.send("Decline not Found")
            }else{
                res.send(rejectedTasked)
            }
            let userUpdate = await user.findOneAndUpdate({email:req.body.email},{$push:{blackedTrips:req.body._id}})
            if(!userUpdate){
                console.log("Decline err")
            }
            else{
                console.log("Decline success")
            }
        }

    }
    catch(e){
        res.send(e)

    }

}

module.exports = {addTrips,getAllTrips,getSpecificTrip ,travellingRequest, getRequestToOwner ,acceptOrReject}