'use strict';

// Lesson 1: The Client and Server Model.
// Your standalone code and written observations for this lesson live here,
// as code and comments. The site work happens in the stretch-records folder.
//
// Step 4: how many requests did the single page load make? List three by name.
// The single page load made 12 requests. Three of them are:
// 1. index.html
// 2. styles.css
// 3. scripts.js
//
// Step 6: which files changed when you added the sixth artist, which did not,
// and why is that separation the point?
// The files that changed when I added the sixth artist were artists.json and script.js.
// The file that did not change was index.html. This separation is important because it 
// demonstrates the client-server model, where the client (index.html) requests data from
// the server (artists.json) and the server responds with the requested data, which is then
// processed by the client-side script (script.js) to update the page dynamically without 
// needing to reload the entire page.
//
// Step 7: paste the console error the broken artists.json produced.
// Uncaught (in promise) SyntaxError: Unexpected token ']', ..."jpg"
//  },
// ]" is not valid JSON
//
// Step 8: build one artist object, JSON.stringify() it, log the text,
// JSON.parse() it back, and log one property of the result.

const artist = {
  name: "The Beatles",
  genre: "Rock",
  total: "13:45",
  photo: "images/johnny-cash.jpg"
};

const artistJson = JSON.stringify(artist);
console.log(artistJson);

const parsedArtist = JSON.parse(artistJson);
console.log(parsedArtist.name);

//
// STRETCH, step 9: describe your page as a system. Name the client, name the
// server, and state what the request asked for and what the response carried.
// The client is the web browser, which requests data from the server (artists.json).
// The request asks for the list of artists, and the response carries the JSON data 
// containing the artist information.
