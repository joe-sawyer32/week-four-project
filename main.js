/*
  Here is a guide for the steps you could take:
*/

// 1. First select and store the elements you'll be working with

// 2. Create your `onSubmit` event for getting the user's search term

// 3. Create your `fetch` request that is called after a submission

// 4. Create a way to append the fetch results to your page

// 5. Create a way to listen for a click that will play the song in the audio play

var searchBox = document.querySelector("#userSearch");
var submitBox = document.querySelector("#searchSubmit");
var results = document.querySelector(".results");
var searchBoxValue;

searchBox.addEventListener("click", function() {
  searchBox.value = "";
});

submitBox.addEventListener("click", function() {
  event.preventDefault();
  searchBoxValue = searchBox.value;
  performSearch(searchBoxValue);
});

function displayTracks(tracks) {
  var trackOptionBlock = document.createElement("div");
  trackOptionBlock.classList.add("trackOptions");
}

function getTracks(user) {
  var url =
    "https://api.soundcloud.com/users/" +
    user +
    "/tracks" +
    "?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f";
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      displayTracks(data);
    })
    .catch(function(error) {
      throw new Error("You were not able to get and/or process tracks...");
    });
}

function clearResults() {
  if (results.innerHTML != "") {
    results.innerHTML = "";
  }
}

function displayArtists(artists) {
  var artistOptionsBlock = document.createElement("div");
  artistOptionsBlock.classList.add("artist-options-block");
  for (let i = 0; i < artists.length; i++) {
    var thisArtist = artists[i];
    var artist = thisArtist.username;
    var artistTrackCount = thisArtist.track_count;
    if (artistTrackCount > 0) {
      var artistOption = document.createElement("div");
      artistOption.classList.add("artist-option");
      console.log("Artist Id: " + thisArtist.id);
      artistOption.id = thisArtist.id;
      console.log("Id Passed: " + artistOption.id);
      var user = document.createElement("h3");
      user.classList.add("user");
      user.innerHTML = "Username: " + artist;
      var tracks = document.createElement("h4");
      tracks.classList.add("tracks");
      tracks.innerHTML = "Tracks: " + artistTrackCount;

      artistOption.addEventListener("click", function() {
        getTracks(this.id);
      });

      artistOption.appendChild(user);
      artistOption.appendChild(tracks);
      artistOptionsBlock.appendChild(artistOption);
    }
  }
  results.appendChild(artistOptionsBlock);
}

function performSearch(keyword) {
  var url =
    "https://api.soundcloud.com/users?q=" +
    keyword +
    "&client_id=095fe1dcd09eb3d0e1d3d89c76f5618f";
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      clearResults();
      displayArtists(data);
    })
    .catch(function(error) {
      throw new Error("You were not able to search and/or display results...");
    });
}
