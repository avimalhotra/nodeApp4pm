const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/node').then(() => console.log('Connected to database!'));
//mongoose.connect('mongodb://localhost:27017/cars', {useNewUrlParser: true, useUnifiedTopology: true});


const db=mongoose.connection;

const Schema=mongoose.Schema;

const Car=new Schema({
    _id:mongoose.ObjectId,
    name:{type:String, required:true, unique:true, dropDups:true },
    power:{type:Number, required:true },
    type:{type:String, required:true },
},{collection:"cars"});

const cars=mongoose.model("cars",Car);


db.on('error', function(err){ throw err }); 

db.once("open",function(){

    //const car=new cars({ _id:new mongoose.Types.ObjectId(),name:"grand vitara",power:103, type:"suv"});
    //car.save().then(i=>console.log("saved")).catch(e=>console.warn("data not saved"));

    //cars.find({name:"swift"}).then(i=>console.log(i)).catch(e=>console.warn(e));
    //cars.find({name:/swift/i}).then(i=>console.log(i)).catch(e=>console.warn(e));
    //cars.find({type:"hatchback"}).then(i=>console.log(i)).catch(e=>console.warn(e));
    //cars.find({power:{$gte:100}}).then(i=>console.log(i)).catch(e=>console.warn(e));
    //cars.find({}).then(i=>console.log(i)).catch(e=>console.warn(e));
    //cars.find({},null,{limit:1}).then(i=>console.log(i)).catch(e=>console.warn(e));
    //cars.find({},null,{sort:{power:1}}).then(i=>console.log(i)).catch(e=>console.warn(e));


});