// Imports Required
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");

// setting the keys required
var vantage = keys.vantage;
const alpha = require("alphavantage")({
  key: vantage
});

// Commands @ process.argv[2]
var spotify_Command = "spotify-this-song";
var OMDB_Command = "movie-this";
var check_Stock_Market = "check-the-market";
var do_It = "do-what-it-says";

var spotify = new Spotify(keys.spotify);

command_Valaidation();

function command_Valaidation() {
  if (process.argv[2] === spotify_Command) {
    var search_Song = process.argv.splice(3).join(" ");
    spotify_Search(search_Song);
  }

  if (process.argv[2] === OMDB_Command) {
    var search_Movie = process.argv.splice(3).join("+");
    OMDB_Search(search_Movie);
  }
  if (process.argv[2] === check_Stock_Market) {
    // Obtains and saves the symbol inputted
    var my_Symbol = (process.argv[3]).toUpperCase();
    stock_Market_Search(my_Symbol);
  }

  if (process.argv[2] === do_It) {
    follow_Random_Text();
  }
}

function spotify_Search(search_Song) {
  // If there is no input for a song, it calls it's default
  if (search_Song === "") {
    spotify
      .search({
        type: "track",
        query: "The Sign Ace of Base"
      })
      .then(function (response) {
        // Local variables
        var artist_Name = response.tracks.items[0].artists[0].name;
        var song_Title = response.tracks.items[0].name;
        var preview_Url = response.tracks.items[0].preview_url;
        var album_Name = response.tracks.items[0].album.name;
        // Displayong the API call results
        console.log(
          "\n-------------------------------- SEARCH RESULT --------------------------------\n" +
          "\nArtist: " + artist_Name +
          "\nSong Title: " + song_Title +
          "\nPreview URL: " + preview_Url +
          "\nAlbum: " + album_Name +
          "\n\n-----------------------------------------------------------------------------\n");
      })
      .catch(function (err) {
        console.log(err);
      });
  } else {
    spotify
      .search({
        type: "track",
        query: search_Song
      })
      .then(function (response) {
        // local variables
        var artist_Name = response.tracks.items[0].artists[0].name;
        var song_Title = response.tracks.items[0].name;
        var preview_Url = response.tracks.items[0].preview_url;
        var album_Name = response.tracks.items[0].album.name;

        console.log(
          "\n-------------------------------- SEARCH RESULT --------------------------------\n" +
          "\nArtist: " + artist_Name +
          "\nSong Title: " + song_Title +
          "\nPreview URL: " + preview_Url +
          "\nAlbum: " + album_Name +
          "\n\n-----------------------------------------------------------------------------\n");
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}

function OMDB_Search(search_Movie) {
  // API KEY
  var omdb = keys.omdb;
  // Components of query URL
  var mov_Url = {
    first_Part: "http://www.omdbapi.com/?t=",
    search: search_Movie,
    add_Ons: "&y=&plot=short&apikey=",
    API_Key: omdb.key
  };
  // This Triggers the Default value for a movie
  if (search_Movie === "") {
    axios
      .get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=" + mov_Url.API_Key)
      .then(function (response) {
        // local variables
        var resp = response.data;
        var title = resp.Title;
        var year = resp.Year;
        var IMDB_Rating = resp.Ratings[0].Value.split("/").splice(0, 1) + " out of 10";
        var RT_Rating = resp.Ratings[1].Value.split("/").splice(0, 1);
        var country = resp.Country;
        var language = resp.Language;
        var plot = resp.Plot;
        var actors = resp.Actors;
        // Display the result of the request
        console.log(
          "\n-------------------------------- SEARCH RESULT --------------------------------\n" +
          "\nMovie Title: " + '"' + title + '"' +
          "\nYear Released: " + year +
          "\nIMDB Rating: " + IMDB_Rating +
          "\nRotten Tomatoes Rating: " + RT_Rating +
          "\nMade In: " + country +
          "\nLanguage: " + language +
          "\nPlot: " + '"' + plot + '"' +
          "\nActors: " + actors +
          "\n\n-----------------------------------------------------------------------------\n");
      });
  } // Makes a request based on the User's Input
  else {
    axios
      .get(mov_Url.first_Part + mov_Url.search + mov_Url.add_Ons + mov_Url.API_Key)
      .then(function (response) {
        // local variable
        var resp = response.data;
        var title = resp.Title;
        var year = resp.Year;
        var IMDB_Rating = resp.Ratings[0].Value.split("/").splice(0, 1) + " out of 10";
        var RT_Rating = resp.Ratings[1].Value.split("/").splice(0, 1);
        var country = resp.Country;
        var language = resp.Language;
        var plot = resp.Plot;
        var actors = resp.Actors;
        // Display the Result of the request
        console.log(
          "\n-------------------------------- SEARCH RESULT --------------------------------\n" +
          "\nMovie Title: " + '"' + title + '"' +
          "\nYear Released: " + year +
          "\nIMDB Rating: " + IMDB_Rating +
          "\nRotten Tomatoes Rating: " + RT_Rating +
          "\nMade In: " + country +
          "\nLanguage: " + language +
          "\nPlot: " + '"' + plot + '"' +
          "\nActors: " + actors +
          "\n\n-----------------------------------------------------------------------------\n");
      });
  }
}

function stock_Market_Search(my_Symbol) {

  // Generates the request to the Alpha Vantage API
  alpha.data.daily(my_Symbol).then(function (data) {
    // Local Variables
    var title = data["Meta Data"]["1. Information"];
    var symbol = data["Meta Data"]["2. Symbol"];
    var last_Refresh = data["Meta Data"]["3. Last Refreshed"];
    var time_Zone = data["Meta Data"]["5. Time Zone"];
    var date = data["Time Series (Daily)"][last_Refresh];
    var open = data["Time Series (Daily)"][last_Refresh]["1. open"];
    var high = data["Time Series (Daily)"][last_Refresh]["2. high"];
    var low = data["Time Series (Daily)"][last_Refresh]["3. low"];
    var close = data["Time Series (Daily)"][last_Refresh]["4. close"];
    // Display the Results
    console.log(
      "\n--------------------------- Today's Market Summary ---------------------------\n" +
      "\n" + title + "\n" +
      "\nDate     : " + last_Refresh +
      "\nTime Zone: " + time_Zone +
      "\nSymbol   : " + symbol +
      "\nOpen     : " + "$ " + Number.parseFloat(open).toFixed(2) +
      "\nHigh     : " + "$ " + Number.parseFloat(high).toFixed(2) +
      "\nLow      : " + "$ " + Number.parseFloat(low).toFixed(2) +
      "\nClose    : " + "$ " + Number.parseFloat(close).toFixed(2) +
      "\n\n-----------------------------------------------------------------------------\n");
  });
}

function follow_Random_Text() {
  fs.readFile("./random.txt", "utf8", function (err, data) {
    if (err) {
      console.log(err);
    }
    var text_Array = data.split(",");
    var command = text_Array[0];
    search_Song = text_Array[1];

    if (command === spotify_Command) {
      spotify_Search(search_Song);
    }
  })
}