const db= require('./connection').db;
const mongoose= require('./connection').mongoose;

const chatsSchema = mongoose.Schema({
    persons:{type:String}, //eg one@gmail.comtwo@gmail.com
    chats:[{
        sender:{type:String},
        message:{type:String},
        dateTime:{type:Date}
    }]
})

let chatsModel = mongoose.model('chats',chatsSchema,'chats')
module.exports = {chatsModel}