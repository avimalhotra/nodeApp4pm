require("dotenv").config();
const port=process.env.port || 3000;
const path=require("path");

const express=require("express")
const app=express();

const compression = require('compression');
app.use(compression());

const userRoutes=require("./routes/user");
app.use('/user',userRoutes);

const nunjucks=require("nunjucks");

const mdb=require('./mdb');
//const cars=require('./models/cars');
//const pin=require('./models/pin');
//const user=require('./models/user');

const bodyParser=require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

const session=require('express-session');
app.set('trust proxy', 1);
app.use(session({
    secret:"session",
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}));

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user);
  });
passport.deserializeUser(function (user, next) {
    next(null, user);
});

passport.use( new LocalStrategy({ usernameField: 'name', passwordField:'password' },(username, password, done) => {
      
    user.find({ name: username }).then(( user, err) => { 

        user=user[0];

      if (err) { return done(err); }
      if (!user) { return done(null, null, { message: 'No user found!' }); }
      if (user.password !== password) {return done(null, null, { message: 'Username or password is incorrect!' }) }

      return done(null, user, null);

    });
  }
));

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).render('login.html',{msg:"Forbidden",title:"Login Again"});
    }
}



app.use(express.static('src/public'));

// configure
nunjucks.configure(path.resolve(__dirname,'public/views'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
});



app.get("/",(req,res)=>{
    res.status(200).render("index.html",{ title:"express app", id:35,});
});


app.get("/login",(req,res)=>{
    res.status(200).render("login.html",{ title:"Login Page"});
});

app.get('/admin', isAuthenticated ,(req, res) => { res.render('admin.html',{title:"admin"}) });
 
app.post("/login",(req,res)=>{
    
    passport.authenticate('local',  (err, user, info) =>{
        
        if (err) {
          res.render('login.html', { error: err });
        } 
        else if (!user) {
          res.render('login.html', { errorMessage: info.message });
        } 
        else {
          //setting users in session
          req.logIn(user, function (err) {
            if (err) {
              res.render('login.html', { error: err });
            } else {
              res.render('admin.html',{ name:user.name});
             }
          })
        }
      })(req, res);
});


app.get("/cars",(req,res)=>{
    const x=req.query;

    cars.find({name:x.car}).then(i=>{
        
        if(i.length>0){
            res.status(200).send(i);
        }
        else{
            res.status(200).send("No Car Found");
        }
        
    }).catch(e=>{
        res.status(200).send("Error");
    });

});

app.get("/api/",(req,res)=>{ res.status(200).send("API") })

app.get("/api/:pin",(req,res)=>{ 

    const x=req.params.pin;

    pin.find({pincode:x}).then(i=>{ 
        if(i.length==0){ 
            res.status(200).send([{error:"No City FOund"}]);
        }
        else{
            res.status(200).send(i);
        }
     })
});

app.get("/about",(req,res)=>{res.status(200).render("about.html",{ title:"About Us"})});
app.get("/contact",(req,res)=>{res.status(200).render("contact.html",{ title:"Contact Us"})});


app.get("/**",(req,res)=>{
    res.status(404).render("error.html",{title:"404"})
})

app.listen(port,()=>{
    console.log(`App running at http://127.0.0.1:${port}`);
})