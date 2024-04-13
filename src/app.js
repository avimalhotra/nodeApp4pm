require("dotenv").config();
const port=process.env.port || 3000;
const path=require("path");
const express=require("express")
const app=express();
const nunjucks=require("nunjucks");

const mdb=require('./mdb');

//const year=2024;
const car={name:"swift",power:90};
const arr=[2,3,4,8];


// configure
nunjucks.configure(path.resolve(__dirname,'public/views'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
});

app.use(express.static('src/public'));

app.get("/",(req,res)=>{
    res.status(200).render("index.html",{ 
        title:"express app", 
        car:car, 
        sayHi(){ return 2+3 }, 
        data:arr,
        id:35,
    });
});

app.get("/about",(req,res)=>{res.status(200).render("about.html",{ title:"About Us"})});
app.get("/contact",(req,res)=>{res.status(200).render("contact.html",{ title:"Contact Us"})});


app.get("/**",(req,res)=>{
    res.status(404).render("error.html",{title:"404"})
})

app.listen(port,()=>{
    console.log(`App running at http://127.0.0.1:${port}`);
})