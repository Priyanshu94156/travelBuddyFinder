const mongoose =  require('mongoose');
const url= "mongodb+srv://travelBuddyFinder:12345abcde@travelbuddy.ncdo6tr.mongodb.net/travelBuddy";

mongoose.connect(url);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
module.exports ={db,mongoose};