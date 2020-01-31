const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("user");
const googlekeys = require("./googleKey");
const config = require("config");
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get('secretOrKey');
module.exports = passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.user.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.log(err));
    })
);
module.exports = passport.use(new GoogleStrategy({
    // options strategy
    callbackURL: "http://localhost:5000/auth/google/redirect",
    clientID: googlekeys.google.googleid,
    clientSecret: googlekeys.google.secret
}, (accessToken, refreshToken, profile, email, done) => {
    //check if user exists in DB
    User.findOne({ email: email.emails[0].value }).then(currentUser => {
        if (currentUser) {
            //login with google
            console.log("user already exists");
            currentUser.loggedIn = true;
            console.log("currentUser", currentUser);
            currentUser.save().then(res => done(null, res));
        } else {
            const newUser = new User({
                username: email.displayName,
                email: email.emails[0].value,
                oAuth: true,
                googleid: email.id
            });
            newUser.save().then(user => {
                console.log("new user created" + user);
                done(null, user);
            });
        }
    });
})
)
