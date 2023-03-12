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
    members:[],
    requestedMembers:[],
    messages_info:[
        {
            message:String,
            email:String
        }
    ],
    blackList:[]
})


 let tripModel=mongoose.model('tripDetails',tripSchema,'tripDetails');
module.exports={tripModel};