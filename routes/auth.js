const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const passport = require("passport");
const User = require("../model/userModel")

// auth login 
/* router.get("/googlelogin", (req, res) => {
   res.render("login");
}); */
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        console.log("auth get")
        User
            .findOne({ _id: req.user.id })
            .then(response => {
                /*  console.log("response", response); */
                // remove password before sending back
                // const userDetails = Object.assign({}, response._doc);
                // delete userDetails.password;
                // res.json(userDetails);
                res.json(response);
            })
            .catch(err => res.status(404).json({ error: "User does not exist!" }));
    }
);


router.post('/',
    async (req, res) => {
        const {
            email,
            password
        } = req.body;
        try {
            // See if user exists
            let user = await User.findOne({
                email
            })
            if (!user) {
                return res.status(400)
                    .json({
                        erros: {
                            msg: 'Invalid credentials'
                        }
                    });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({
                        erros: [{
                            msg: 'Invalid Credentials'
                        }]
                    });
            }
            const payload = {
                user: {
                    id: user.id
                }
            }
            console.log(payload)
            jwt.sign(
                payload,
                config.get('secretOrKey'), {
                expiresIn: 360000
            },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token
                    })
                });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }
    });

//auth logout
router.get("logout", (req, res) => {
    //handle with passport
    res.send("logging out");
})


//auth with google
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
}));
//callback route for google to  redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    // res.send(" you reached the callback URI")
    res.send("callback function working")
})

module.exports = router;