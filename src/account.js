const x=require("./app");


/* x.on("account",(res)=>{
    console.log(`account opening under process`);
});

x.on("account",(res)=>{
    console.log(`account opening done`);
}); */

x.once("account",(res)=>{
    console.log(`account opening under process`);
});




