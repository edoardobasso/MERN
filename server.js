const express = require("express");
const port = process.env.PORT || 5000;
const passport = require("passport");
const app = express();

app.listen(port, () => {
  console.log("Server is running on " + port);
});
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use("/cities", require("./routes/cities"));
app.use("/Itinerary", require("./routes/Itinerary"));
app.use("/user", require("./routes/user"));
app.use("/activities", require("./routes/activities"));
app.use("/auth", require("./routes/auth"));
//app.use("/favourites", require("./routes/favourites"));
// app.use("/passport", require("./config/passport"));
app.use(passport.initialize());
require("./config/passportTest");


const db = require("./keys").mongoURI;
const mongoose = require("mongoose");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connection to Mongo DB established"))
  .catch(err => console.log(err));
