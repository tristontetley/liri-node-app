require("dotenv").config();

const fs = require("fs");

const axios = require("axios");

var moment = require("moment");

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var spotify = (keys.spotify);

var spotifyId = new Spotify({
    id: spotify.id,
    secret: spotify.secret
});

const command = process.argv[2];
let search = process.argv.slice(3).join(" ");

function switchCase(command, search) {
    switch (command) {
        case ("spotify-this-song"):
            spotifyAPI(search);
            break;
        case ("concert-this"):
            search = process.argv.slice(3).join("-");
            seatGeekAPI(search);
            break;
        case ("movie-this"):
            ombdAPI(search);
            break;
        case ("do-what-it-says"):
            everything(search);
            break;
    }
}

function spotifyAPI(search) {
    search = search || "The Sign"
    spotifyId.search({ type: 'track', query: search }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(JSON.stringify(data.tracks.items[0].name, null, 2));
        console.log(JSON.stringify(data.tracks.items[0].artists[0].name, null, 2));
        console.log(JSON.stringify(data.tracks.items[0].external_urls.spotify, null, 2));
        console.log(JSON.stringify(data.tracks.items[0].album.name, null, 2));
    });
}

function seatGeekAPI(search) {
    axios.get(`https://api.seatgeek.com/2/events?performers.slug=${search}&client_id=MTk0MzQzMDJ8MTU3MzU5NDE2OS42OA`)
        .then(function (data) {
            console.log(data.data.events[0].venue.name);
            console.log(data.data.events[0].venue.extended_address);
            let day = moment(data.data.events[0].datetime_utc).format("MM/DD/YYYY");
            console.log(day);
        })
        .catch(function (error) {

            console.log(error);
        })
}

function ombdAPI(search) {
    search = search || "Mr. Nobody"
    axios.get(`http://www.omdbapi.com/?t=${search}&y=&plot=short&apikey=trilogy`).then(
        function (response) {
            console.log(response.data.Title);
            console.log(response.data.Released);
            console.log("The movie's rating is: " + response.data.imdbRating);
            console.log(response.data.Ratings[1].Source);
            console.log(response.data.Ratings[1].Value);
            console.log("This movie was produced in " + response.data.Country);
            console.log(response.data.Language);
            console.log(response.data.Actors);
        })
        .catch(function (error) {

            console.log(error);
        })
}

function everything(command, search) {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.split(",");
        switchCase(data[0], data[1]);
    });
}
switchCase(command, search);


