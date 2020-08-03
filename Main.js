/*
THIS IS JUST AN TEMPLATE FOR PASSPORT INTEGERATION TO THE NODEJS APPLICATION.
CHANGE ACCORDINGLY TO YOUR APPLICATION.
---------------------------CONTENT---------------------------
-EXPRESS 
-USERMODEL
-MONGODB CONNECTION
-PASSPORT
-------------------------------------------------------------
*/


const express = require('express');                         //Require express
const app = express();                                      //express Instance
const session= require('express-session');                  //express session
const passport = require('passport');                       //Passport module for authentication
const LocalStrategy = require('passport-local').Strategy;   //localstrategy 
const mongoose = require('mongoose');                       //For MongoDb connection
const MongoStore = require('connect-mongo')(session);       //specifically consumes session for session storing only.For more info goto Documentation Folder
const {v4: uuid} = require('uuid');                         //For generating unique ids for session



app.use(bodyParser.json());                                 //For request body parsing
app.use(bodyParser.urlencoded({extended:false}));           //if url decoder neeeded then set extended true
app.use(cookieParser());                                    //cookie parser if needed


app.use(session({                                           //middleware for experss session 
    genid: (req)=> {                                        //Generating umique session Ids
        return uuid();
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),        
    //store instance for storing session data 
    secret: 'what the hell corona',                                             
    //For signing session keys
    resave: false,                                                               
    //Forces the session to be saved back to the session store, even if the session was never modified during the request.The default value is true
    // If it does not implement the touch method and your store sets an expiration date on stored sessions, then you likely need resave: true.
    saveUninitialized: false,         
    //Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified. Choosing false is useful for implementing login sessions, reducing server storage usage, or complying with laws that require permission before setting a cookie. Choosing false will also help with race conditions where a client makes multiple parallel requests without a session.The default value is true                               
    cookie : { httpOnly: true, secure : false, maxAge : (4 * 60 * 60 * 1000)} 
}));
//Always use passport after express session middleware
app.use(passport.initialize());                              //middleware is required to initialize Passport
app.use(passport.session());                                 //If your application uses persistent login sessions, passport.session() middleware must also be used.


passport.use(new LocalStrategy(                              //Local Strategy for Authentication
    async (username, password, done) => {
     try{
       const user =  await UserModel.findOne({username : username}).exec();
        // here is where you make a call to the database
        // to find the user based on their username or email address
       if(!user){ //check for users existence 
         return done(null,user, {message: 'Invalid username or password'});
       }
       const passwordOK = await user.comparePassword(password); //compare password
       if (!passwordOK) {
           return done(null, false, { message: 'Invalid username or password' }); //not found. Send the error message to callback
       }
       return done(null, user); //return user to callback
     }catch(err){
         return done(err);
     }
   }
 ));
 //Database connection should be created first before starting the listener 
 //For the security make sure the DB connection string stored somewhere safe such as environment variable;for that checkout dotenv module
 mongoose.connect("mongodb+srv://<userName>:<password>@<clusterName>?retryWrites=true&w=majority", {useNewUrlParser: true}).then(() => {
    console.log('Connected to MongoDB');
    http.listen(port, () =>{
      console.log(`listening on *:${port}`);  //server listener
    });
  })
  .catch((err) => {
    console.error(err);
  });