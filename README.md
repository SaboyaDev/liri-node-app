# liri-node-app

* LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, 

* LIRI will be a command line node app that takes in parameters and gives you back data.

## Goals:

* To search Spotify for any song, OMDB for movies, and the Stock Market.

* To be retireve the data from the Data Bases, and to display the results on to the terminal.

* liri.js can take one of this commands 

  * spotify_this_song

  * movie_this

  * check_the_market

  * do_what_it_says

## Tools:

  ```
    * Axious           - To grab data from the OMDB API
    * DotEnv           - Improves the security of our program for API Keys and Tokens by creating .env
    * Node-Spotify-API - Allows to get access to the Spotify Database with Authentication

  ```
## Intructions

## What Each Command Does:

### 1. spotify_this_song:

* `node liri.js spotify_this_song '<song search here>'`

  * This will show the following information about the song in your terminal/bash window

    * Artist(s)

    * The song's name

    * A preview link of the song from Spotify

    * The album that the song is from

  * If no song is provided then your program will default to "The Sign" by Ace of Base.

  ![github](https://github.com/joseluissaboya/liri-node-app/blob/master/GIFs/spotify-this-song-default-val.gif)

  ![github](https://github.com/joseluissaboya/liri-node-app/blob/master/GIFs/spotify-this-song-any-song.gif)

### 2. movie_this: 

* `node liri.js movie_this '<movie title here>'`

  * requires the user to input a title of a movie

  * This will output the following information to your terminal/bash window:

    ```
      * Title of the movie.
      * Year the movie came out.
      * IMDB Rating of the movie.
      * Rotten Tomatoes Rating of the movie.
      * Country where the movie was produced.
      * Language of the movie.
      * Plot of the movie.
      * Actors in the movie.

    ```

![github](https://github.com/joseluissaboya/liri-node-app/blob/master/GIFs/movie-this-default-value.gif)

![github](https://github.com/joseluissaboya/liri-node-app/blob/master/GIFs/movie-this-any-movie.gif)

### 3. check_the_market:

* `node liri.js check_the_market '<stock symbol>'`

  * This will connect with the Alpha Vantage API which will provide us with the daily performance of any stock and display the following results:

      ```
      * Time Zone
      * The Symbol
      * The Opening Price
      * The closing Price
      * The High of the Day
      * The Low of the Day
      * The Closing  Price

    ```

  ![github](https://github.com/joseluissaboya/liri-node-app/blob/master/GIFs/check-the-market.gif)

### 4. do_what_it_says:

* `node liri.js do_what_it_says`

  *

  ![github](https://github.com/joseluissaboya/liri-node-app/blob/master/GIFs/read-file-do-task.gif)