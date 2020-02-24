"use strict";

const express = require("express");
const morgan = require("morgan");

const { top50 } = require("./data/top50");

const PORT = 8000;

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// endpoints here
app.get("/top50", (req, res) => {

  res.render("pages/top50", {
    title: "Top 50 Songs Streamed on Spotify",
    top50array: top50
  });
});

app.get("/top50/popular-artist", (req, res) => {
  let popSongsByArtist = {};
  // loop through top50 to group each artists records together //
  top50.forEach(recordInfo => {
    // if artist record does not exist, then create an array with their first record (which is recordInfo) //
    if (popSongsByArtist[recordInfo.artist] === undefined) {
      popSongsByArtist[recordInfo.artist] = [recordInfo];
    }
    // if record already exists, add the record to the artists record list //
    else {
      popSongsByArtist[recordInfo.artist].push(recordInfo);
    }
  });

  let bestArtistRecords = [];
  // artistRecordKey is a placeholder for the key value in the object for loop below. 
  let artistRecordKey;
  // for in is used to loop through each property in an object 
  // that object is popSongsByArtist 
  for (artistRecordKey in popSongsByArtist) {
    // check if the current artist at artistRecordKey has more records than the current best artist 
    // best artist starts at empty 
    if (popSongsByArtist[artistRecordKey].length > bestArtistRecords.length) {
      // since the current artist has more records than the best artist 
      // set the best artist = to the current artist
      bestArtistRecords = popSongsByArtist[artistRecordKey]
    }
  }
  // return the best artists records into the top 50 array 
  res.render("pages/top50", {
    title: "Most Popular Artist",
    top50array: bestArtistRecords,
  });
});


// handle 404s
app.get("*", (req, res) => {
  res.status(404);
  res.render("pages/fourOhFour", {
    title: "I got nothing",
    path: req.originalUrl
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
