// Imports Required
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");

// setting the keys required
var spotify = new Spotify(keys.spotify);
var vantage = keys.vantage;
const alpha = require("alphavantage")({
  key: vantage
});

// var search_Song = process.argv.splice(3).join(" ");

// Command Object
var command = {
  // searches for a particular track and displays the results
  spotify_this_song: function(search) {
    // var search_Song = process.argv.splice(3).join(" ");
    // If there is no input for a song, it calls it's default
    if (search === "") {
      spotify
        .search({
          type: "track",
          query: "The Sign Ace of Base"
        })
        .then(function(response) {
          // Collects important info from the track and calls the print function
          command.spotify_Resp(response);
        })
        .catch(function(err) {
          console.log(err);
        });
    } else {
      spotify
        .search({
          type: "track",
          query: search
        })
        .then(function(response) {
          // Collects important info from the track and calls the print function
          command.spotify_Resp(response);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  // searches for a particular movie and displays the results
  movie_this: function() {
    // API KEY
    var omdb = keys.omdb;
    // Search Term
    var search_Movie = process.argv.splice(3).join(" ");
    // console.log("test "+search_Movie);

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
        .get(
          "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=" +
            mov_Url.API_Key
        )
        .then(function(response) {
          command.OMDB_Resp(response);
        });
    } // Makes a request based on the User's Input
    else {
      axios
        .get(
          mov_Url.first_Part +
            mov_Url.search +
            mov_Url.add_Ons +
            mov_Url.API_Key
        )
        .then(function(response) {
          command.OMDB_Resp(response);
        });
    }
  },
  // checks the the performace of the symbol inserted for today
  check_the_market: function() {
    var my_Symbol = process.argv[3].toUpperCase();
    // Generates the request to the Alpha Vantage API
    alpha.data.daily(my_Symbol).then(function(response) {
      command.alpha_Vantage_Resp(response);
    });
  },
  //
  do_what_it_says: function() {
    fs.readFile("./random.txt", "utf8", function(err, data) {
      if (err) {
        console.log(err);
      }
      var text_Array = data.split(",");
      var text_Command = text_Array[0];
      var search = text_Array[1].slice(1, -1); // removes the quotes around the word

      if (text_Command === "spotify-this-song") {
        command.spotify_this_song(search);
      }
    });
  },

  // DATA COLLECTION/MANIPULATION
  // ========================================================================================
  // Collects important info from the track and calls the print function
  spotify_Resp: function(response) {
    // local variables
    // console.log(response);

    var artist_Name = response.tracks.items[0].artists[0].name;
    // console.log(artist_Name);

    var song_Title = response.tracks.items[0].name;
    var preview_Url = response.tracks.items[0].preview_url;
    var album_Name = response.tracks.items[0].album.name;
    command.spotify_Disp(artist_Name, song_Title, preview_Url, album_Name);
  },
  OMDB_Resp: function(response) {
    // local variable
    var resp = response.data;
    var title = resp.Title;
    var year = resp.Year;
    var IMDB_Rating =
      resp.Ratings[0].Value.split("/").splice(0, 1) + " out of 10";
    var RT_Rating = resp.Ratings[1].Value.split("/").splice(0, 1);
    var country = resp.Country;
    var language = resp.Language;
    var plot = resp.Plot;
    var actors = resp.Actors;
    command.OMDB_Disp(
      title,
      year,
      IMDB_Rating,
      RT_Rating,
      country,
      language,
      plot,
      actors
    );
  },
  alpha_Vantage_Resp: function(response) {
    // Local Variables
    var title = response["Meta Data"]["1. Information"];
    var symbol = response["Meta Data"]["2. Symbol"];
    var last_Refresh = response["Meta Data"]["3. Last Refreshed"];
    var time_Zone = response["Meta Data"]["5. Time Zone"];
    var date = [last_Refresh.split(" ")[0]];
    var open = response["Time Series (Daily)"][date]["1. open"];
    var high = response["Time Series (Daily)"][date]["2. high"];
    var low = response["Time Series (Daily)"][date]["3. low"];
    var close = response["Time Series (Daily)"][date]["4. close"];
    command.alpha_Vantage_Disp(
      title,
      last_Refresh,
      time_Zone,
      symbol,
      open,
      high,
      low,
      close
    );
  },

  // DATA RESPONSE DISPLAYED
  // ========================================================================================
  // Prints the Spotify Results
  spotify_Disp: function(artist_Name, song_Title, preview_Url, album_Name) {
    var log =
      "\n-------------------------------- SEARCH RESULT --------------------------------\n" +
      "\nArtist: " +
      artist_Name +
      "\nSong Title: " +
      song_Title +
      "\nPreview URL: " +
      preview_Url +
      "\nAlbum: " +
      album_Name +
      "\n\n-----------------------------------------------------------------------------\n\n";
    // Displayong the API call results
    console.log(log);
    // record keeping method called
    this.recordKeeping(log);
  },
  OMDB_Disp: function(
    title,
    year,
    IMDB_Rating,
    RT_Rating,
    country,
    language,
    plot,
    actors
  ) {
    // Display the Result of the request
    var log =
      "\n-------------------------------- MOVIE SEARCH RESULT --------------------------------\n" +
      "\nMovie Title: " +
      '"' +
      title +
      '"' +
      "\nYear Released: " +
      year +
      "\nIMDB Rating: " +
      IMDB_Rating +
      "\nRotten Tomatoes Rating: " +
      RT_Rating +
      "\nMade In: " +
      country +
      "\nLanguage: " +
      language +
      "\nPlot: " +
      '"' +
      plot +
      '"' +
      "\nActors: " +
      actors +
      "\n\n-----------------------------------------------------------------------------\n\n";
    console.log(log);
    // record keeping method called
    this.recordKeeping(log);
  },
  alpha_Vantage_Disp: function(
    title,
    last_Refresh,
    time_Zone,
    symbol,
    open,
    high,
    low,
    close
  ) {
    var log =
      "\n--------------------------- Today's Market Summary ---------------------------\n" +
      "\n" +
      title +
      "\n" +
      "\nDate     : " +
      last_Refresh +
      "\nTime Zone: " +
      time_Zone +
      "\nSymbol   : " +
      symbol +
      "\nOpen     : " +
      "$ " +
      Number.parseFloat(open).toFixed(2) +
      "\nHigh     : " +
      "$ " +
      Number.parseFloat(high).toFixed(2) +
      "\nLow      : " +
      "$ " +
      Number.parseFloat(low).toFixed(2) +
      "\nClose    : " +
      "$ " +
      Number.parseFloat(close).toFixed(2) +
      "\n\n-----------------------------------------------------------------------------\n\n";
    // Display the Results
    console.log(log);
    // record keeping method called
    this.recordKeeping(log);
  },

  // Keeps a logging record of all the searches.
  recordKeeping: function(log) {
    var path = "./log.txt";

    fs.access(path, fs.constants.F_OK, err => {
      if (err) {
        return fs.writeFile("log.txt", log, function(err) {
          // If the code experiences any errors it will log the error to the console.
          if (err) {
            return console.log(err);
          }
          // Otherwise, it will print: "movies.txt was updated!"
          console.log("The search log was updated!");
        });
      }
      fs.appendFile("log.txt", log, function(err) {
        // If the code experiences any errors it will log the error to the console.
        if (err) {
          return console.log(err);
        }
        // Otherwise, it will print: "movies.txt was updated!"
        console.log("The search log was updated!");
      });
    });
  }
};

// Evaluates the command inputed and triggers the proper function inside of the command Object
if (typeof command[process.argv[2]] === "function") {
  // if the command does not equal spotify_this_song and does not equal do_what_it_says run the mathing method within the command object
  if (
    process.argv[2] !== "spotify_this_song" &&
    process.argv[2] !== "do_what_it_says"
  ) {
    command[process.argv[2]]();
  }
  // if the command equal spoti_this_song it collects the search term from terminal input and calls the method spotify_this_song with and passes the search term as a parametere
  if (process.argv[2] === "spotify_this_song") {
    let search = process.argv.splice(3);
    search = search.join(" ");
    command[process.argv[2]](search);
  }
  // if the command is do_what_it_says that method is called
  else if (process.argv[2] === "do_what_it_says") {
    command[process.argv[2]]();
  }
}
