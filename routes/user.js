const express = require("express");
const userModel = require("../model/userModel");
const router = express.Router();
router.get("/all", (req, res) => {
  userModel
    .find()
    .then(files => {
      res.send(files);
    })
    .catch(err => console.log(err));
});
router.post("/", (req, res) => {
  const newUser = new userModel({
    email: req.body.email,
    password: req.body
  });
  newUser
    .save()
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      df;
      res.status(500).send("Server error");
    });
});
router.post("/add", (req, res) => {
  const newUser = new userModel({
    email: req.body.email,
    password: req.body
  });
  newUser
    .save()
    .then(User => {
      res.send(User);
    })
    .catch(err => {
      res.status(500).send("Server error");
    });
});

module.exports = router;
