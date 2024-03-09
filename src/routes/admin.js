const express=require("express");
const router=express.Router();

router.use((req,res,next)=>{
    console.log(`Admin login at ${new Date().toLocaleString()}`);
    next()  
});

router.get("/",(req,res)=>{
    res.status(200).send("Admin Routes")
});
router.get("/login",(req,res)=>{
    res.status(200).send("Admin Login")
});


module.exports=router;