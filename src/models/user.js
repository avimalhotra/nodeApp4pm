const mongoose=require('../mdb');

const db=mongoose.connection;

const Schema=mongoose.Schema;

const User=new Schema({
    _id:{type:mongoose.ObjectId, select:false},
    name:{type:String, required:true, unique:true, dropDups:true },
    password:{type:String, required:true },
},{collection:"users"});

module.exports=mongoose.model("user",User);