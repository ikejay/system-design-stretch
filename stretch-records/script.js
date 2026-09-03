"use strict";

// The roster, exactly where the JavaScript course's finale left it: an array
// of artist objects at the top of the file, and one repeatable rule that
// renders it. In this course the data moves out of this file, step by step.

const cardArea = document.querySelector(".cards");

// Every artist currently on the page, whatever the data's source. renderCards
// maintains this list, so the shuffle button and the form keep working no
// matter where the artists came from.
const roster = [];

// One card from one artist: the shared builder, used by the first render
// and by the form below.
function buildCard(artist) {
  const card = document.createElement("article");
  if (artist.photo) {
    const photo = document.createElement("img");
    photo.src = artist.photo;
    photo.alt = `${artist.name}, artist photo`;
    card.append(photo);
  }
  const title = document.createElement("h3");
  title.textContent = artist.name;
  const line = document.createElement("p");
  line.textContent = `${artist.genre}, ${artist.total} of music`;
  card.append(title, line);
  return card;
}

function renderCards(list) {
  for (const artist of list) {
    roster.push(artist);
    cardArea.append(buildCard(artist));
  }
}

class MissingArtistsError extends Error {
  constructor(reason, field = null) {
    const message =
      reason === "empty" ? "No artists found" : `Field ${field} is missing`;
    super(message);
    this.name = "MissingArtistsError";
    this.reason = reason;
    this.field = field;
  }
}

function checkArtist(artist) {
  if (!artist.name) {
    throw new MissingArtistsError("incomplete", "name");
  }

  return artist;
}

const loadingMessage = document.createElement("p");
loadingMessage.className = "loading-message";
loadingMessage.textContent = "Loading artists ...";
cardArea.appendChild(loadingMessage);

async function loadArtists() {
  cardArea.textContent = "";
  try {
    const response = await fetch("artists.json");
    const artists = await response.json();

    if (artists.length === 0) {
      throw new MissingArtistsError("empty");
    }

    artists.forEach((artist) => {
      checkArtist(artist);
    });
    renderCards(artists);
  } catch (error) {
    if (error instanceof MissingArtistsError) {
      // The wording avoids technical details, explains the temporary state,
      // and gives the visitor a clear action they can take.
      if (error.reason === "empty") {
        cardArea.textContent =
          "No artists are available at this time. Please check back later.";
      } else if (error.reason === "incomplete") {
        cardArea.textContent =
          "Artist data is incomplete. Please check the source.";
      }
    } else {
      cardArea.textContent =
        "An unexpected error occurred while loading artists. Please try again later.";
    }
    throw new Error(
      `Stretch Records artist page loading artists failed: ${error.message}`,
    );
  } finally {
    loadingMessage.remove();
  }
}

setTimeout(
  loadArtists().catch((error) => {
    console.error("Error loading artists:", error);
  }),
  1000,
);

// Shuffle: pick a random artist and feature them.
const shuffleButton = document.querySelector(".shuffle");

shuffleButton.addEventListener("click", () => {
  if (roster.length === 0) return;
  const pick = roster[Math.floor(Math.random() * roster.length)];
  document.querySelector(".featured").textContent =
    `Featured today: ${pick.name}`;
});

// The suggestion form: an empty submission does nothing, because an empty
// string is falsy.
const form = document.querySelector(".signup");
const nameInput = document.querySelector("#artist-name");
const genreInput = document.querySelector("#artist-genre");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value;
  if (name) {
    const genre = genreInput.value || "Unsigned";
    renderCards([{ name: name, genre: genre, total: "0:00" }]);
    nameInput.value = "";
    genreInput.value = "";
  }
});
