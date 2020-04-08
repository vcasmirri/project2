require("dotenv").config();

var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var firstArg = process.argv[2];
var secArg = [];
for (var i=3; i<process.argv.length; i++){
  secArg.push(process.argv[i]);
}
secArg = secArg.join(" ")

function spotify(){
  //--------------Spotify aPI--------------------------
  var spotify = new Spotify(keys.spotify);
  spotify.search({ type: 'track', query: secArg })
  .then(function(response) {
      for (i=0; i <20; i++){
      console.log("Artist: ", response.tracks.items[i].artists[0].name); //got this to work finally
      console.log("Song Name: ", response.tracks.items[i].name);
      console.log("Preview the song: ", response.tracks.items[i].preview_url);
      console.log("Album Name: ", response.tracks.items[i].album.name);
      console.log("--------")
      }
  })
  .catch(function(err) {
      console.log(err);
  });//-------Spotify API ending----------------------
  };

  if (firstArg === "spotify"){
    spotify();
}