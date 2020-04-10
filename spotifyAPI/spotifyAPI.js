require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');


function spotify(search) {
  // console.log(search)
  // console.log(keys.spotify)
 
  var spotify = new Spotify(keys.spotify);
  spotify.search({ type: 'track', query: search })
    .then(function (response) {
      console.log("song name", response.tracks.items[0].name)

  
      return response.tracks.items
    })
    .catch(function (err) {
      console.log(err);
    });//-------Spotify API ending----------------------
  };


  module.exports = spotify;
