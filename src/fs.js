const os=require("os");
const fs=require("fs");


//const read=fs.readFileSync('src/data.txt');                   // avoid
//console.log( read );                    // buffer
//console.log( read.toString() );                    // string


/* const read=fs.readFile("src/data.txt",{encoding:'utf-8'},(err,res)=>{
    if(err){
        console.warn(err);
    }
    else{
        console.log(res); 
    }
});  */

/* const read=fs.readFile("src/data.json",{encoding:'utf-8'},(err,res)=>{
    if(err){
        console.warn(err);
    }
    else{
        console.log( JSON.parse(res) ); 
    }
});  */




/* const read=fs.stat("src/app.txt",(err,res)=>{
    if(err){
        console.warn(err);
    }
    else{
        console.log(res.size); 
        console.log(res.isDirectory()); 
        console.log(res.isFile()); 
    }
}); */

/* fs.writeFile('src/data.txt',`file updated at ${new Date().toLocaleString()}`,'utf-8',(err)=>{
    console.log(err);
}); */

/* fs.appendFile('src/data.txt',`file updated at ${new Date().toLocaleString()} \n`,'utf-8',(err)=>{
    console.log(err);
}); */

/* fs.unlink("src/data.txt",(err,res)=>{
    if(err){ console.log(err);}
    else{ console.log(res);}
}); */


console.log("done");


