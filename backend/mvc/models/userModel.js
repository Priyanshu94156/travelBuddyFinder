const db= require('./connection').db;
const mongoose= require('./connection').mongoose;

const userSchema= mongoose.Schema({
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
        type:String,
        // required:true
    },
    gender:{
        type:String,
        // required:true
    }
})
 let userModel=mongoose.model('users',userSchema);
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