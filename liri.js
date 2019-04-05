//////////////////////CONNECTING TO VARIOUS THINGS//////////////////////////
require('dotenv').config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var omdb = keys.omdb.apiID;
var $ = require('jquery');
var moment = require('moment');
////////////////////////FUNCTIONS FOR ANALYSIS/////////////////////////

//---------------------------------------------------------------------SPOTIFY
function searchSpotify(term) {
    spotify.search({ type: 'track', query: term }, function(err, data) {
        if (err) {
            console.log("-----------------");
            return console.log('Error occurred: ' + err);
        }
        console.log("LOOK HERE: ", term);
        console.log(data.tracks.items[0]);
        console.log("-----------------");
        //artist
        console.log(data.tracks.items[0].album.artists[0].name);
        //song's name
        console.log(data.tracks.items[0].name);
        //preview link
        console.log(data.tracks.items[0].preview_url);
        //album
        console.log(data.tracks.items[0].album.name);

    });
};

//---------------------------------------------------------------------OMDB
function searchOMDB(term){
    var axios = require("axios");
    console.log(term);
    console.log(omdb);
    var url="http://www.omdbapi.com/?t=" + term + "&apikey="+ omdb;
    console.log(url);
    axios.get(url).then(
        function(response) {
            // Then we print out the imdbRating
            console.log("-----------------");
            console.log('*Title of the movie:', response.data.Title);
            console.log('*Year the movie came out:', response.data.Year);
            console.log('*IMDB Rating of the movie:', response.data.imdbRating);
            console.log('*Rotten Tomatoes Rating of the movie:', response.data.Ratings[1]);
            console.log('*Country where the movie was produced:', response.data.Country);
            console.log('*Language of the movie:', response.data.Language);
            console.log('*Plot of the movie:', response.data.Plot);
            console.log('*Actors in the movie:', response.data.Actors);
            console.log("-----------------");
        }
    )   
};
//---------------------------------------------------------------------BANDS IN TOWN
function searchBandsInTown(term){
    var axios = require("axios");
    axios.get("https://rest.bandsintown.com/artists/"+term+"/events?app_id=codingbootcamp")
    .then(function(response) {
        //name of venue
        
        for(var i=0; i<response.data.length; i++){
            console.log(response.data[i].venue.name);
        };
        
        // for(var i=0; i<response.data.length){

        // }
        console.log(response.data[0].venue.name);
        //name of locatoin

        //date of the event 

        // console.log("LOOK HERE: ", term);
        // console.log("Venue:",response.venue.name);
        // console.log("Venue location: ", response.venue.Country);
        // console.log("Date of the event: ", moment(response.datetime).format('MM-DD-YYYY'));
        
        console.log("-----------------");
    });
};
//---------------------------------------------------------------------DO WHAT IT SAYS
var fs = require("fs");
function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(error, data) {
        console.log(data);
       
    });
};

//---------------------------------------------------------------------MAIN FUNCTION
var catagory = process.argv[2];
var searchTerm = process.argv[3];
   
switch (catagory) {
    case "concert-this":
        searchBandsInTown(searchTerm);
        break;
    case "spotify-this-song":
        searchSpotify(searchTerm);
        break;
    case "movie-this":
        searchOMDB(searchTerm);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("Your input was not recognized. Please try again.")
        break;
}