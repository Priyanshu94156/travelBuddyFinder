const express = require('express');

const tripCtrl = require("../../models/trips")
const user = require('../../models/userModel').userModel;
const googleCalender = require('./calendar')
// import { updateCalendar } from './calendar';


async function addTrips(req, res){
    try{
    console.log(req.body)
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
    let userFind = await user.find({email: req.body.owner})
    if(!userFind){
        res.send("Not Found")
    }
    else{
        console.log(userFind)
        if(userFind[0].tripTime != undefined){
            var times = userFind[0].tripTime
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
            let userFind2 = await user.findOne({email:req.body.owner})
            if(!userFind2){
                res.send("Not Found")
            }
            else{
                if(userFind2.currentSubscription>0){
                    let userUpdate = await user.updateOne({email:req.body.owner},{$set:{currentSubscription:userFind2.currentSubscription-1}})
                    if(!userUpdate){
                        res.send("Error")
                    }else{
                        console.log("data", userFind2)
                           googleCalender.updateCalendar(req.body.tripName,req.body.description,req.body.startDate,req.body.endDate,req.body.owner)
                            let result = await addTripData.save()
                            if(!result){
                                console.log("Not Added")
                                res.send(err)
                            }else{
                                console.log("added")
                                // console.log(result)
                                // timess = {startDate: result.startDate, endDate: result.endDate}
                                let vaild = await user.updateOne({email:result.owner}, {$push:{tripTime:{"startDate":result.startDate, "endDate":result.endDate}}})
                                if(!vaild){
                                    res.send(err)
                                }else{
                                    res.send("permission granted")
                                }
                                let updateUserTrips = await user.updateOne({email:result.owner},{$push:{trips:result._id}})
                                if(!updateUserTrips){
                                    res.send(err)
                                }
                                else{
                                    console.log("done")
                                }
                            }
                    }
            }else{
                res.send('buy a subscription')
            }


    }
}
}
    }
    catch(e){
        res.send(e)
    }
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

async function getSpecificTrip(req,res){
    try{
    console.log("hello",req.body)
    console.log(req.body.tripName)
    let trip = await tripCtrl.tripModel.findOne({owner:req.body.owner,tripName:req.body.tripName})
    console.log(trip)
    if(!trip){
        res.send("no data found")
    }
    else{
        console.log(trip)
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

function getTripsForProfile(req, res){
    tripCtrl.tripModel.find({email:req.body.email}, (err, trip) =>{
        res.send(trip)
    })
}


async function getUpcomingTrip(req, res){
    try{
    const data = await (await user.find({email:req.body.email}).populate('trips'))
    if(!data){
        res.send("Not Found")
    }
    else{
    let upcomingTrips = []
    console.log(data)
    for(let i = 0; i < data[0].trips.length; i++){
        // if(data[0].trips[i].endDate < )
        // console.log("sdfsd",data[0].trips[i].startDate)
        if(new Date(Date()) < data[0].trips[i].startDate){
            console.log(data[0].trips[i])
            const toShow = {
                tripName: data[0].trips[i].tripName,
                email: data[0].trips[i].owner,
                objectId: data[0].trips[i]._id,
                members: data[0].trips[i].members,
                startDate: data[0].trips[i].startDate,
                from: data[0].trips[i].from,
                to: data[0].trips[i].to
            }
            upcomingTrips.push(toShow)
        }
    }
    res.send(upcomingTrips)
}
}
catch(e){
    res.send("Not Found")
}
}

module.exports = {getUpcomingTrip, getTripsForProfile, addTrips,getAllTrips,getSpecificTrip ,travellingRequest, getRequestToOwner ,acceptOrReject}