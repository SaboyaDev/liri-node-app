# liri-node-app

* LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, 

* LIRI will be a command line node app that takes in parameters and gives you back data.
## There are four commands:

### spotify_this_song:
  * `node liri.js spotify_this_song '<song search here>'`
  * takes what ever you typed after the command and searches the spotify DB
  * If no search query was added, there is a default value for back up.
  ![github](https://github.com/joseluissaboya/liri-node-app/blob/master/GIFs/spotify-this-song-default-val.gif)
  ![github](https://github.com/joseluissaboya/liri-node-app/blob/master/GIFs/spotify-this-song-any-song.gif)
### movie_this 
  * `node liri.js movie_this '<movie name here>'`
  * requires the user to input a name of a movie, which will 
  * check-the-market
  * do-what-it-says
  ![github](https://github.com/joseluissaboya/liri-node-app/blob/master/GIFs/movie-this-default-value.gif)
  ![github](https://github.com/joseluissaboya/liri-node-app/blob/master/GIFs/movie-this-any-movie.gif)
### check_the_market
  * `node liri.js check_the_market '<stock symbol>'`
  ![github](https://github.com/joseluissaboya/liri-node-app/blob/master/GIFs/check-the-market.gif)

### do_what_it_says
  * `node liri.js do_what_it_says`
  ![github](https://github.com/joseluissaboya/liri-node-app/blob/master/GIFs/read-file-do-task.gif)