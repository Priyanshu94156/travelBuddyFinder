const storyCtrl = require("../../models/stories")
const user = require('../../models/userModel').userModel;



function createStory(req, res){
    console.log(req.body)
    console.log(req.files)
    pics = []
    for (let i=0; i<req.files.length; i++){
        pics.push(req.files[i].location)
    }
    const createStory = storyCtrl.storyModel({
        email:req.body.email,
        tripName:req.body.tripName,
        description: req.body.description,
        from: req.body.from,
        to: req.body.to,
        photos: pics
    })
    createStory.save((err, result) =>{
        if(err) res.send(err)
        else res.send(result)
    })
}

function getAllStory(req, res){
    storyCtrl.storyModel.find({}, (err,data) =>{
        if(err) res.send(err)
        else res.send(data)
    })
}

module.exports = {createStory, getAllStory}