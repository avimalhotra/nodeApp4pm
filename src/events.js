const { log } = require('console');
//const fs=require('fs');
const Event=require("events").EventEmitter;
const emitter=new Event();
module.exports=emitter;

/* build in events */
/* fs.ReadStream("src/data.txt").on("open",()=>{
    console.log("file open");
});
*/


/* error event */
//emitter.emit("error",new Error("Error Found"));




/* multiple emit */
/* emitter.on("done",(res="",x)=>{
    console.log(`event done by ${res}`);  
    x.executed=false;
});
emitter.on("done",(res="",x)=>{
    if(x.executed==true){
        console.log(`again done by ${res}`);  
    }
}); */



/* single emit */
/* emitter.once("callOnce",(res)=>{
    console.log("called");
}); */

/* remove */
/* function removeEvent(){
    console.log("removed events");
    emitter.removeListener("done",removeEvent);
}
emitter.on("done",removeEvent);

emitter.emit("done","avi");
emitter.emit("done","avi"); */



//emitter.emit("done","avi",{executed:false});
//emitter.emit("done","lorem");
//emitter.emit("callOnce","avi");


const login=require('./login');
const account=require('./account');

emitter.emit("login","avi");
emitter.emit("account");
