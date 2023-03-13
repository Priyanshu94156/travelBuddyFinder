const tripCtrl = require("../../models/trips").tripModel

async function tripDetails(req, res) {
    tripCtrl.find({_id: req.params.id},(err, trip) => {
        if(err){
            res.send(err)
        }
        else{
            res.send(trip)
        }
    })}
module.exports = {tripDetails};