require("dotenv").config();

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var spotify = (keys.spotify);

var spotifyId = new Spotify({
    id: spotify.id,
    secret: spotify.secret
});

const command = process.argv[2];
const song = process.argv[3];


switch (command) {
    case ("spotify-this-song"):
        spotifyAPI();
        break;
}


function spotifyAPI() {
    spotifyId.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(JSON.stringify(data.tracks.items[0].artists[0].name, null, 2));
        console.log(JSON.stringify(data.tracks.items[0].name, null, 2));
        console.log(JSON.stringify(data.tracks.items[0].external_urls.spotify, null, 2));
    });
}


