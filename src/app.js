const express=require("express");
const app=express();
const path=require("path");
require("dotenv").config();
const bp=require("body-parser");
const cookieparser=require('cookie-parser');
const session=require("express-session");
const parseurl=require("parseurl");

const ejs=require("ejs");
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views'));

//const LRU=require("lru-cache");
//ejs.cache = LRU(100);

const multer=require("multer");
//const upload=multer({dest:"src/public/uploads/"});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/public/uploads/')
    },
    filename: function (req, file, cb) {
        //cb(null, (file.originalname)) ;
      cb(null, Date.now() + path.extname(file.originalname)) 
    }
});
const upload=multer({storage:storage});



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
    //res.status(200).send(`<h1> Express session</h1>`);
    res.render('index',{h1:"EJS Website",title:"Hello World",user:{name:"Avinash",id:200},data:["jan","feb","mar","apr"]});
});
app.get("/about",(req,res)=>{
    res.render('about',{h1:"About US",title:"About Us"});
});
app.get("/contact",(req,res)=>{
    res.render('contact',{h1:"Contact US"});
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
app.post("/upload",upload.single("picture"),(req,res)=>{
    console.log(req.file);
    //console.log(req.body);
    
    res.status(200).send("File Uploaded");
});


/* wild card handler */
app.get("/**",(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(404).send(`<h1>404, Page Not Found</h1>`)
});

app.listen(process.env.PORT,()=>{
    console.log(`App server running at http://127.0.0.1:${process.env.PORT}`);
});