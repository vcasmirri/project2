require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');


function spotify(obj, res) { 
  var spotify = new Spotify(keys.spotify);
  spotify.search({ type: 'track', query: obj.search })
    .then(function (response) {
      console.log(response.tracks.items[0].name)
      
      res.json(response.tracks.items[0]); 

    })
    .catch(function (err) {
      console.log(err);
    });//-------Spotify API ending----------------------
  };


  module.exports = spotify;
