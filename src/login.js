const x=require("./app");

x.on("login",(res)=>{
    console.log(`login process initiated by ${res}`);
});
x.on("login",(res)=>{
    console.log(`login process done`);
});


