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
        console.log(data);
        console.log("-----------------");
    });
};

//---------------------------------------------------------------------OMDB
function searchOMDB(term){
    var axios = require("axios");
    console.log(term);
    console.log(omdb);
    var url="http://www.omdbapi.com/?t=" + term + "&apikey="+ "792372e4";
    console.log(url);
    axios.get(url).then(
        function(response) {
            // Then we print out the imdbRating
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
    axios.get("https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp")
    .then(function(response) {
        console.log("LOOK HERE: ", term);
        console.log("Venue:",response.headers.name);
        console.log("Date of the event: ", moment(response.headers.date).format('MM-DD-YYYY'));
        //console.log(response);
        console.log("-----------------");
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
        console.log("Got into do what it says!");
        break;
    default:
        console.log("Your input was not recognized. Please try again.")
        break;
}