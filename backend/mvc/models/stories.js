const db= require('./connection').db;
const mongoose= require('./connection').mongoose;

const storySchema = mongoose.Schema({
    email:{
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
    photos:{
        type: Array
    }
})


 let storyModel=mongoose.model('storyDetails',storySchema,'storyDetails');
module.exports={storyModel};