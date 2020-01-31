/* const express = require("express")
const authRoutes = require("./routes/auth");
const oauth = express()
const passport = require("./config/passport")
const cookieSession = require("cookie-session");


// set a view engine
oauth.set("view engine", "ejs");

oauth.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

//initialize passport
oauth.use(passport.initialize());
oauth.use(passport.session())


//set up routes


//connect to mongo db
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log("connected to MongoDB")
});

//create home route
oauth.getMaxListeners("/", (req, res) => {
    res.render("home");
});



oauth.listen(3000, () => {
    console.log("app now listening for requests on port 3000")
}); */