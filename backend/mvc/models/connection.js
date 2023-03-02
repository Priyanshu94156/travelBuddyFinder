const mongoose =  require('mongoose');
const url= "mongodb://localhost:27017/timoo";

mongoose.connect(url);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
module.exports ={db,mongoose};