//1. Basic usage
mongoose.connect(connectionOptions);
app.use(session({
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

//2. Basic usage
app.use(session({
    store: new MongoStore({ url: 'mongodb://localhost/test-app' })
}));

//3. Basic usage
app.use(session({
    store: new MongoStore({
        url: 'mongodb://user12345:foobar@localhost/test-app?authSource=admins&w=1',
        mongoOptions: advancedOptions // See below for details
    })
}));

//3. Advance usage
app.use(session({
    store: new MongoStore({
        url: 'mongodb://localhost/test-app',
        ttl: 14 * 24 * 60 * 60 // = 14 days expiration date
        //Each time an user interacts with the server, its session expiration date is refreshed.
    })
}));

//4. Advance Usage
app.use(express.session({
    secret: 'keyboard cat',
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: new MongoStore({
        url: 'mongodb://localhost/test-app',
        touchAfter: 24*60*60 // time period in seconds
        //Ify you don't want to resave all the session on database every single time that the user refresh the page, you can lazy update the session, by limiting a period of time.
    })
}));

//5. Basic Usage
app.use(session({
    store: new MongoStore({
        url: 'mongodb://localhost/test-app',
        autoRemove: 'native' // Default
        //If you use connect-mongo in a very concurrent environment, you should avoid this mode and prefer setting the index yourself, once!
    })
}));