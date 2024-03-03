const express=require("express");
const app=express();
require("dotenv").config();

app.use(express.static("src/public"));                  // define path of static resources
app.use(express.static("node_modules/bootstrap/dist/")); // define path of static resources

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
    res.setHeader('Content-Type','text/html');
    res.status(200).send(`<h1>Home Page, ${req.url}</h1>`);
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
    res.status(200).send(`Post data`);
});

app.get("/app",(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).send(`<h1>App Page</h1>`)
});



/* wild card handler */
app.get("/**",(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(404).send(`<h1>404, Page Not Found</h1>`)
});

app.listen(process.env.PORT,()=>{
    console.log(`App server running at http://127.0.0.1:${process.env.PORT}`);
});