const mongoose = require("mongoose");
const activitiesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    itn_id: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("activities", activitiesSchema);
