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

function playTrack(track) {
  console.log(track);
  var player = document.querySelector(".music-player");
  player.setAttribute("autoplay", true);
  var url =
    "http://api.soundcloud.com/tracks/" +
    track +
    "/stream?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f";
  player.src = url;
}

function clearTracks() {
  var tracks = results.querySelector(".trackOptions");
  if (tracks) {
    tracks.remove();
  }
}

function displayTracks(tracks) {
  var trackOptionsBlock = document.createElement("div");
  trackOptionsBlock.classList.add("trackOptions");
  for (let i = 0; i < tracks.length; i++) {
    var thisTrack = tracks[i];
    var artist = thisTrack.user.username;
    var trackTitle = thisTrack.title;
    var trackOption = document.createElement("div");
    trackOption.classList.add("track-option");
    trackOption.id = thisTrack.id;
    var trackPicWrapper = document.createElement("div");
    trackPicWrapper.classList.add("trackPicWrapper");
    var trackPic = document.createElement("img");
    trackPic.classList.add("trackPic");
    trackPic.src = thisTrack.artwork_url;
    var track = document.createElement("h3");
    track.classList.add("track");
    track.innerHTML = trackTitle;
    var user = document.createElement("h4");
    user.classList.add("user");
    user.innerHTML = artist;

    trackOption.addEventListener("click", function() {
      playTrack(this.id);
    });

    trackPicWrapper.appendChild(trackPic);
    trackOption.appendChild(trackPicWrapper);
    trackOption.appendChild(track);
    trackOption.appendChild(user);
    trackOptionsBlock.appendChild(trackOption);
  }
  results.appendChild(trackOptionsBlock);
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
      if (data.length == 0) {
        console.log("This artist does not have any public tracks available.");
      } else {
        clearTracks();
        displayTracks(data);
      }
    })
    .catch(function(error) {
      throw new Error("You were not able to get and/or process tracks...");
    });
}

function clearResults() {
  var artists = results.querySelector(".artist-options-block");
  if (artists) {
    clearTracks();
    artists.remove();
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
      artistOption.id = thisArtist.id;
      var userPicWrapper = document.createElement("div");
      userPicWrapper.classList.add("userPicWrapper");
      var userPic = document.createElement("img");
      userPic.classList.add("userPic");
      userPic.src = thisArtist.avatar_url;
      var user = document.createElement("h3");
      user.classList.add("user");
      user.innerHTML = "Username: " + artist;
      var tracks = document.createElement("h4");
      tracks.classList.add("tracks");
      tracks.innerHTML = "Tracks: " + artistTrackCount;

      artistOption.addEventListener("click", function() {
        getTracks(this.id);
      });

      userPicWrapper.appendChild(userPic);
      artistOption.appendChild(userPicWrapper);
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
      if (data.length == 0) {
        console.log("There are no artists associated with this search.");
      } else {
        clearResults();
        displayArtists(data);
      }
    })
    .catch(function(error) {
      throw new Error("You were not able to search and/or display results...");
    });
}
