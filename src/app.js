require("dotenv").config();
const port=process.env.port || 3000;
const path=require("path");
const express=require("express")
const app=express();
const nunjucks=require("nunjucks");

const mdb=require('./mdb');
const cars=require('./models/cars');
const pin=require('./models/pin');

//const year=2024;
//const car={name:"swift",power:90};
//const arr=[2,3,4,8];


// configure
nunjucks.configure(path.resolve(__dirname,'public/views'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
});

app.use(express.static('src/public'));


app.get("/",(req,res)=>{
    res.status(200).render("index.html",{ title:"express app", id:35,});
});

app.get("/cars",(req,res)=>{
    const x=req.query;

    cars.find({name:x.car}).then(i=>{
        
        if(i.length>0){
            res.status(200).send(i);
        }
        else{
            res.status(200).send("No Car Found");
        }
        
    }).catch(e=>{
        res.status(200).send("Error");
    });

});

app.get("/api/",(req,res)=>{ res.status(200).send("API") })

app.get("/api/:pin",(req,res)=>{ 

    const x=req.params.pin;

    pin.find({pincode:x}).then(i=>{ 
        if(i.length==0){ 
            res.status(200).send([{error:"No City FOund"}]);
        }
        else{
            res.status(200).send(i);
        }
     })

});

app.get("/about",(req,res)=>{res.status(200).render("about.html",{ title:"About Us"})});
app.get("/contact",(req,res)=>{res.status(200).render("contact.html",{ title:"Contact Us"})});


app.get("/**",(req,res)=>{
    res.status(404).render("error.html",{title:"404"})
})

app.listen(port,()=>{
    console.log(`App running at http://127.0.0.1:${port}`);
})