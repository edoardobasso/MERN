const express = require("express");
const activitiesModel = require("../model/activitiesModel");
const router = express.Router();

router.get("/:id", (req, res) => {
    activitiesModel
        .find({ itn_id: req.params.id })
        .then(files => {
            res.send(files);
        })
        .catch(err => console.log(err));
});


router.post("/:id/add", (req, res) => {
    const newActivity = new activitiesModel({
        title: req.body.title,
        itn_id: req.params.id
    });
    newActivity.save()
        .then(Activity => {
            res.send(Activity);
        })
        .catch(err => {
            res.status(500).send("Server error");
        })
});
module.exports = router;
