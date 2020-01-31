const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  oAuth: {
    type: Boolean
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  googleid: {
    type: String
  },
  favourites: {
    type: Array,
    required: true
  }
});

const User = mongoose.model("user", userSchema);


module.exports = mongoose.model("user", userSchema);
