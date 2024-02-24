const http=require("http");
require("dotenv").config();
const fs=require("fs");
const path=require("path");

const server=http.createServer((req,res)=>{
    //res.write(req.url);
    //res.write(req.method);
    //res.write(req.headers.host);
    //res.write("Hello Node");
    
    //res.statusCode=200;
    //res.setHeader("Content-Type","text/html; charset=utf-8");
    //res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"});
    //res.write("<h1>Hello Node</h1>");
    //res.end();                                          // compulsory

    fs.readFile(path.resolve("src/home.html"),(err,data)=>{
        if(err){
            res.writeHead(404,{'Content-Type':'text/html'});
            res.write(err);
            res.end();
        }
        else{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data);
            res.end(); 
        }
    });
})

server.listen(process.env.PORT,()=>{
    console.log(`Server running at http://127.0.0.1:${process.env.PORT}`);
});