require("dotenv").config();
var keys = require ("./keys");
var fs = require("fs");
var spotify = require("spotify");

// imports.spotify = {
//   id: process.env.SPOTIFY_ID,
//   secret: process.env.SPOTIFY_SECRET,
// };

// var spotify = new Spotify(keys.spotify);


var request = require("request");

// Twitter Code 
function getTweets() {
    var Twitter = require("twitter");

    var client = new Twitter(keys.twitter);

    var searches = {
        screen_name: "realDonaldTrump",
        count: 20
    };
    client.get("statuses/user_timeline", searches, listTweets);
}
function listTweets(error, tweets, response) {
    console.log(tweets);
    
     if (!error) {
    
        var data = [];
        for (var i = 0; i < tweets.length; i++) {
            data.push({
                "Tweets: ": (tweets[i].text),
                "Created at: ": (tweets[i].created_at)
            });
          
        }
          console.log(data);
    }
}

// Spotify code
var spotify = new spotify(keys.spotify);
var artistName = function (artist) {
    return artist.name;
    
}
var spotify = function (songName) {
    if (songName === undefined) {
        songName = "perfect";
    };
    spotify.search({
        type: "track",
        query: songName
    }, function (err, data) {
        if (err) {
            console.log(err);
            return;
        
        }
        var songs = data.tracks.items;
        var data = [];
        for (var i = 0; i < songs.length; i++) {
            data.push({
                "Artist(s) ": songs[i].artists.map(artistName),
                "Song Name: ": songs[i].name,
                "Preview song: ": songs[i].preview_url,
               "Album: ": songs[i].album.name,

            });
        }
        console.log(data);
        
    });
        
};


// Movie Code 
function Omdb() {
    var input = process.argv;

    var movie = "";
    for (var i = 3; i < input.length; i++) {
        if (i > 3 && i < input.length) {
            movie = movie + "+" + input[i];
        }
        else {
            movie += input[i];
        }
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("__________________________________");
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("__________________________________");
            console.log("Rating: " + JSON.parse(body).imdbRating);
            console.log("__________________________________");
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].value);
            console.log("__________________________________");
            console.log("Produced Country: " + JSON.parse(body).Country);
            console.log("__________________________________");
            console.log("Language(s): " + JSON.parse(body).Language);
            console.log("__________________________________");
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("__________________________________");
            console.log("Actors: " + JSON.parse(body).Actors);
      
        }
    });
}
// Command Lines 
if (process.argv[2] === "movie-this") {
    Omdb();
}
else if (process.argv[2] === "my-tweets") {
    getTweets();
}
else if (process.argv[2] === "spotify-this-song") {
   
}
else {
    console.log("PLEASE TYPE A COMMAND!");
    
}


