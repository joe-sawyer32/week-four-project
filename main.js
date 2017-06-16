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
var searchBoxValue;

searchBox.addEventListener("click", function() {
  searchBox.value = "";
});

submitBox.addEventListener("click", function(e) {
  e.preventDefault();
  searchBoxValue = searchBox.value;
  console.log(searchBoxValue);
});

fetch();
