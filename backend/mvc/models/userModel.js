const db= require('./connection').db;
const mongoose= require('./connection').mongoose;

const userSchema= mongoose.Schema({
    // img:{
    //     type:String,
    //     // required:true
    // },
    name:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phno:{
        type:String,
        // required:true
    },
    age:{
        type:Number,
        // required:true
    },
    gender:{
        type:String,
        // required:true
    },
    city:{
        type:String,
        // required:true
    },
    nationality:{
        type:String,
        // required:true
    },
    description:{
        type:String,
        // required:true
    },
    smoking:{
        type:String,
    },
    drinking:{
        type:String,
    },
    height:{
        type:Number,
    },
    currentSubscription:{
        type:Number
    },
    previousSubscriptions:[{
        type:Object
    }],
    trips:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'tripDetails'
        }],
    blackedTrips:[],
    visitedUsers:[],
    reviews:[],
    tripTime:[]
})
 let userModel=mongoose.model('users',userSchema,'users');
module.exports={userModel};


//Schema for user objects
// {
//     "_id": {
//       "$oid": "6400a16f1ca873e186217b0d"
//     },
//     "name": "zeeshan",
//     "email": "zeeshan@gmail.com",
//     "phno": "8500899786",
//     "password": "1234",
//     "age": "19",
//     "gender": "Male"
//   }