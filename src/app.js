const express=require("express");
const app=express();
require("dotenv").config();

//app.use(express.static("src/public"));                  // define path of static resources

/* app.use((req,res,next)=>{
    console.log(req.url, req.method);
    next();
});
app.use((req,res)=>{
    res.status=200;
    res.setHeader("Content-Type","text/html");
    res.end("<h1>Express JS</h1>");
}); */

app.get("/",(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).send(`<h1>Home Page</h1>`)
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