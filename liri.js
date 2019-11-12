require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var spotifyId = new Spotify({
    id: spotify.process.env.SPOTIFY_ID,
    secret: spotify.process.env.SPOTIFY_SECRET
});

const command = process.argv[2];


switch (command) {
    case ("spotify-this-song"):
        console.log("maybe next time");
        break;
}