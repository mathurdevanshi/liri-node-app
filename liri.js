require("dotenv").config(); //need to set a variable to this
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);