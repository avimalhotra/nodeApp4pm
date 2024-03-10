const express=require("express");
const app=express();
require("dotenv").config();
const bp=require("body-parser");
const cookieparser=require('cookie-parser');
const session=require("express-session");
const parseurl=require("parseurl");


app.use(bp.urlencoded({ extended: false })); 
app.use(cookieparser());

/* app.set("trust proxy",1);
app.use(session({
    secret:"session",
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false,maxAge:300000}
})); */
app.use(bp.text());

app.use(express.static("src/public"));                  // define path of static resources
app.use(express.static("node_modules/bootstrap/dist/")); // define path of static resources


/* routes */
const admin=require("./routes/admin");
const user=require("./routes/user");


app.use("/admin",admin);
app.use("/user",user);

/* middleware */
/* app.use((req,res,next)=>{
    if (!req.session.views) { req.session.views = {}}
    
      // get the url pathname
      var pathname = parseurl(req).pathname
    
      // count the views
      req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
    
    next();
});  */

/* app.use((req,res)=>{
    res.status=200;
    res.setHeader("Content-Type","text/html");
    res.end("<h1>Express JS</h1>");
});  */

const data=["jan","feb","mar","apr","may","jun"];

app.get("/",(req,res)=>{
    //console.log(req.cookies);
    //res.cookie("pin","201301",{signed:true});
    //res.cookie("state","up", {maxAge:86400000, httpOnly: true});
    //if(req.cookies.name){ console.log(req.cookies.name)}
   // else{ console.log("No name defined")}
    
    res.setHeader('Content-Type','text/html');
    res.status(200).send(`<h1> Express session</h1>`);
});


/* REST API */
app.get("/api",(req,res)=>{
    res.header('Access-Control-Allow-Origin',"*");
    return res.status(200).send(data);
});

app.post("/postapi",(req,res)=>{    
    const x=JSON.parse(req.body);
    const t=data.filter(i=>i==x.query);
    return res.status(200).send(t);
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