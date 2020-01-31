const express = require("express");
const Itinerary = require("../model/userModel");
const router = express.Router();


// router get

router.get("/:id", (req, res) => {
    console.log("fav get")
    Itinerary
        .find({ id: req.params.id })
        .then(files => {
            res.send(files);
        })
        .catch(err => console.log(err));
});




