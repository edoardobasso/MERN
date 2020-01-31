const express = require("express");
const userModel = require("../model/userModel");
const itineraryM = require("../model/ItineraryModel");
const passport = require("passport")
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const key = require("../keys")
const JwtStrategy = require("passport-jwt").Strategy;

// Login route
router.post('/login',
  async (req, res) => {
    const {
      email,
      password
    } = req.body;
    try {
      // See if user exists
      let user = await userModel.findOne({
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
          id: user._id
        }
      }
      console.log(payload)
      const options = { expiresIn: 2592000 };
      jwt.sign(
        payload,
        key.secretOrKey,
        options,
        (err, token) => {
          if (err) {
            res.json({
              success: false,
              token: "There was an error"
            });
          } else {
            res.json({
              success: true,
              token: token
            });
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error')
    }
  });

/* router.post(
  "/add",
  async (req, res) => {
    const {
      email,
      username,
      password
    } = req.body;
    try {
      // See if user exists
      let user = await userModel.findOne({
        email
      });
      if (user) {
        return res.status(400).json({
          erros: {
            msg: "User already exists"
          }
        });
      }

      user = new userModel({
        email,
        oauth: false,
        username,
        password
      });
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id
        }
      };
      const options = { expiresIn: 2592000 };
      jwt.sign(
        payload,
        key.secretOrKey,
        options,
        (err, token) => {
          if (err) {
            res.json({
              success: false,
              token: "There was an error"
            });
          } else {
            res.json({
              success: true,
              token: token
            });
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
); */
router.get(
  "/pass",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userModel
      .findOne({ _id: req.user.id })
      .then(user => {
        res.json(user);
        console.log(user)
      })
      .catch(err => res.status(404).json({ error: "User does not exist!" }));
  }
);
router.get(
  "/favorite",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userModel
      .findOne({ _id: req.user.id })
      .then(user => {
        res.json(user.favoriteItineraries);
      })
      .catch(err => {
        res.status(404).json({ error: "User not found" });
      });
  }
);
router.post(
  "/add_favourite",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userModel
      .findOne({ _id: req.user._id })
      .then(user => {
        let currentFavItineraries = user.favourites.filter(
          oneFavItin => oneFavItin.itineraryId === req.body.itineraryId
        );

        if (currentFavItineraries.length !== 0) {
          res.status(400).json({ error: "User already liked this itinerary!" });
        } else {
          itineraryM
            .findOne({ _id: req.body._id })
            .then(itinerary => {

              user.favourites.push({
                itineraryId: req.body._id,
                name: itinerary.title,
                cityId: itinerary.city
              });
              console.log(user)
              user
                .save()
                .then(userFavItin => res.json(user.favoriteItineraries))
                .catch(err => {
                  res
                    .status(500)
                    .json({ error: "The itinerary could not be saved" });
                });
            })
            .catch(err => {
              res
                .status(404)
                .json({ error: "Cannot find the itinerary with this id!" });
            });
        }
      })
      .catch(err => {
        res.status(404).json({ error: "User not found" });
      });
  }
);

module.exports = router;
