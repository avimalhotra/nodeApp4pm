const mongoose = require('mongoose');

//mongoose.connect('mongodb://127.0.0.1:27017/node').then(() => console.log('Connected to database!'));
mongoose.connect(`mongodb+srv://admin:${process.env.MDB}@avi.j3vc0.mongodb.net/?retryWrites=true&w=majority`).then(() => console.log('Connected to Atlas database!'));

const db=mongoose.connection;

db.on('error', function(err){ throw err }); 

db.once("open",function(){
    console.log("Mongoose connected");
});

module.exports=mongoose;