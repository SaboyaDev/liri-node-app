// require("dotenv").config();
console.log("(Keys have been loaded)");

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

module.exports.omdb = {
  key: process.env.OMDB_API_Key
};

module.exports.vantage = {
  key: process.env.ALPHA_KEY
}
