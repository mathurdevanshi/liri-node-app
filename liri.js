var axios = require("axios");
var dotenv = require("dotenv").config();
const fs = require('fs-extra');

/////////////////////////////////////////////////
            //questions//
//what does this top stuff even doing here?//
/////////////////////////////////////////////////

require('dotenv').config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

/////////////////////////////////////////////////
            //questions//
//why won't Spotify console.log anything???//
/////////////////////////////////////////////////

console.log("Spotify:", Spotify, spotify);
console.log("-----------------");


spotify.search({ type: 'track', query: 'Call Me Al' }, function(err, data) {
    if (err) {
        console.log("-----------------");
        return console.log('Error occurred: ' + err);
        
    }
    console.log(data);
    console.log("-----------------");
});