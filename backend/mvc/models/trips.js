const db= require('./connection').db;
const mongoose= require('./connection').mongoose;

const tripSchema = mongoose.Schema({
    owner:{
        type: String
    },
    tripName:{
        type: String
    },
    description:{
        type: String
    },
    from:{
        type: String
    },
    to:{
        type: String
    },
    startDate:{
        type: Date
    },
    endDate:{
        type: Date
    },
    flexible:{
        type: Boolean
    },
    preferences:{
        type: String
    },
    keywords:{
        type: String
    },
    travellingCost:{
        type: String
    },
    photos:{
        type: Array
    },
    gender:{
        type: String
    }
})


 let tripModel=mongoose.model('tripDetails',tripSchema,'tripDetails');
module.exports={tripModel};