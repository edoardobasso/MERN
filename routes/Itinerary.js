const express = require("express");
const ItineraryModel = require("../model/ItineraryModel");
const router = express.Router();

//GET itineraries by city
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  ItineraryModel.find({ city_id: id })
    .then(itineraries => {
      if (itineraries == null) res.send({ msg: "No Itineraries found" });
      else res.send(itineraries);
    })
    .catch(err => console.log(err));
});

/* router.get("/:id", (req, res) => {
  console.log(req.params.id);
  ItineraryModel.find({
    city_id: req.params._id
  })
    .then(files => {
      res.send(files);
    })
    .catch(err => console.log(err));
}); */

router.post("/:id/add", (req, res) => {
  const newItinerary = new ItineraryModel({
    title: req.body.title,
    picture: req.body.picture,
    rating: req.body.rating,
    duration: req.body.duration,
    price: req.body.price,
    hashtag: req.body.hashtag,
    city_id: req.params.id
  });
  console.log(newItinerary);
  newItinerary
    .save()
    .then(Itinerary => {
      res.send(Itinerary);
    })
    .catch(err => {
      res.status(500).send("Server error");
    });
});
module.exports = router;
