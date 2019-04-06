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
        console.log("Phrase Searched: " ,term);
        for (let index = 0; index < data.tracks.items.length; index++) {
            console.log("---------------------------------- RESULT #"+ (index+1) +"----------------------------------");
            console.log("*Name of the artists: ",data.tracks.items[index].album.artists[0].name);
            console.log("*Song's name: ",data.tracks.items[index].name);
            console.log("*Preview link for the song: ",data.tracks.items[index].preview_url);
            console.log("*The album the song is from: ",data.tracks.items[index].album.name);
            console.log("----------------------------------END OF RESULT----------------------------------");
        }
        
    });
};
//---------------------------------------------------------------------OMDB
function searchOMDB(term){
    var axios = require("axios");
    var url="http://www.omdbapi.com/?t=" + term + "&apikey="+ omdb;
    axios.get(url).then(
        function(response) {   
            console.log("-----------------");
            console.log('*Title of the movie:', response.data.Title);
            console.log('*Year the movie came out:', response.data.Year);
            console.log('*IMDB Rating of the movie:', response.data.imdbRating);
            console.log('*Rotten Tomatoes Rating of the movie:', response.data.Ratings[1].Value);
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
        for (let index = 0; index < response.data.length; index++) {
            console.log("---------------------------------- RESULT #"+ (index+1) +"----------------------------------");
            console.log("*Name of the venue: ",response.data[index].venue.name);
            console.log("*Venue location: ",response.data[index].venue.city +", "+response.data[index].venue.country);
            console.log("*Date of the event: ",response.data[index].datetime);
            console.log("----------------------------------END OF RESULT----------------------------------");
        }
    });
};
//---------------------------------------------------------------------DO WHAT IT SAYS
var fs = require("fs");
function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(error, data) {
        console.log(data);
        var randomtxt = data.split(',');
        catagory = randomtxt[0];
        searchTerm= randomtxt[1];

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
    });
};

//---------------------------------------------------------------------MAIN FUNCTION

var catagory = process.argv[2];
var searchTerm = process.argv[3];
   
switch (catagory) {
    case "concert-this":
        if (searchTerm==null){
            searchTerm="Lumineers";
            console.log("No input given. Default: ", searchTerm);
        };
        searchBandsInTown(searchTerm);
        break;
    case "spotify-this-song":
        if (searchTerm==null){
            searchTerm="The Sign";
            console.log("No input given. Default: ", searchTerm);
        };
        searchSpotify(searchTerm);
        break;
    case "movie-this":
        if (searchTerm==null){
            searchTerm="Mr. Nobody";
            console.log("No input given. Default: ", searchTerm);
        };
        searchOMDB(searchTerm);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("Your input was not recognized. Please try again.")
        break;
}