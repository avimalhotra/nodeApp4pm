const express=require("express");
const app=express();
require("dotenv").config();
const bp=require("body-parser");
const cookieparser=require('cookie-parser');

app.use(bp.urlencoded({ extended: false })); 
app.use(cookieparser("secret"));
//app.use(bp.json());

//app.use(express.static("src/public"));                  // define path of static resources
//app.use(express.static("node_modules/bootstrap/dist/")); // define path of static resources


/* routes */
const admin=require("./routes/admin");
const user=require("./routes/user");


app.use("/admin",admin);
app.use("/user",user);

/* middleware */
/* app.use((req,res,next)=>{
    console.log( "app");
    next();
}); */

/* app.use((req,res)=>{
    res.status=200;
    res.setHeader("Content-Type","text/html");
    res.end("<h1>Express JS</h1>");
});  */

app.get("/",(req,res)=>{
    //console.log(req.cookies);
    //res.cookie("pin","201301",{signed:true});
    //res.cookie("state","up", {maxAge:86400000, httpOnly: true});
    if(req.cookies.name){ console.log(req.cookies.name)}
    else{ console.log("No name defined")}
    
    res.setHeader('Content-Type','text/html');
    res.status(200).send(`<h1>Hello ${req.signedCookies.pin}</h1>`);
});
app.get("/search",(req,res)=>{
    res.setHeader('Content-Type','text/html');
    //res.status(200).send(req.query);
    res.status(200).json(req.query);
});
app.get("/:brand/:product/:model",(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).send(req.params);
});

app.post("/login",(req,res)=>{
    //for(let i in req.body){ console.log(i, req.body[i]);}
    res.status(200).json(`${req.body.email} ${req.body.pass}, Post data`);
});

app.get("/app",(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).send(`<h1>App Page</h1>`);
});


/* wild card handler */
app.get("/**",(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(404).send(`<h1>404, Page Not Found</h1>`)
});

app.listen(process.env.PORT,()=>{
    console.log(`App server running at http://127.0.0.1:${process.env.PORT}`);
});