const express=require("express");
const router=express.Router();

router.get("/",(req,res)=>{
    res.status(200).send("user Routes");
});
router.get("/add",(req,res)=>{
    res.status(200).send("user add");
});
router.get("/login",(req,res)=>{
    res.status(200).send("user login");
});


module.exports=router;

