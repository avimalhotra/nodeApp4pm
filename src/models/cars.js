const mongoose=require('../mdb');

const db=mongoose.connection;

const Schema=mongoose.Schema;

const Car=new Schema({
    _id:{type:mongoose.ObjectId, select:false},
    name:{type:String, required:true, unique:true, dropDups:true },
    power:{type:Number, required:true },
    type:{type:String, required:true },
    "__v":{type:String, select:false}
},{collection:"cars",versionKey:false});

module.exports=mongoose.model("cars",Car);