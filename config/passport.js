const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const keys = require("../keys");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../model/userModel")
//const express = require("express")
//router = express.Router();


/* passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
    done(null, user.id);
}) */


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;


passport.use(
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













passport.use(
    new GoogleStrategy({
        // options for google strategy
        callbackURL: "http://localhost:5000/auth/google/redirect",
        clientID: keys.google.googleid,
        secret: keys.google.secret
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our database
        /*  User.findOne({ googleid: profile.id }).then((currentUser) => {
             if (currentUser) {
                 //alreadyexists
                 console.log("user is", currentUser),
                     done(null, currentUser)
             } else {
                 // if not create user in our DB
                 new User({
                     username: profile.displayName,
                     googleid: profile.id
                 }).save().then((newUser) => {
                     console.log("newUser created" + newUser);
                     done(null, newUser);
                 });
             }
         }) */
        console.log(profile)




    })
);





