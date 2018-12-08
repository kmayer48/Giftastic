//array of TV shows
var shows = ["Rugrats", "Doug", "Batman", "Arthur", "Hey Arnold!", "Dexter's Labratory", "Magic School Bus", "Tiny Toons Adventures", "Powerpuff Girls", "The Angry Beavers", "CatDog", "Teenage Mutant Ninja Turtles", "Pokemon", "Garfield", "Ed Edd n Eddy", "The Wild Thornberrys", "ThunderCats", "Spongebob Squarepants", "Johnny Bravo"]

// function to generate new buttons on page according to the shows array
var buttonGenerator = function () {
  //emptys to not show duplicate buttons
  $(".buttons").empty()
  for (var i = 0; i < shows.length; i++) {
  //adds buttons and the applicable text according to the show arrays as well as bootstrap classes
  var buttons = $("<button>");
  buttons.text(shows[i]);
  buttons.attr("class", "button col-xs-12 btn-light")
  buttons.attr("button-name", shows[i]);
  $(".buttons").append(buttons);
  }
}

buttonGenerator(); 

//function for clicking a button to retrieve gifs through giphy api
$(document).on("click", ".button", function() {
    var show = $(this).attr("button-name");
    console.log(show)
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      show + "&api_key=683Q36g3l1yhneyDA0bvkpDdxNz7OoYU&limit=10";
    $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
        console.log(response)
        //local variable to store results
        var gifResults = response.data;
        for (var i = 0; i < gifResults.length; i++) {
        //creates divs and attributes for bootstrap
        //also adds title and rating directly from the giphy api
        var gifDiv = $("<div>");
        gifDiv.attr("class", "card gif mb-3 mx-2")
        var title = $("<h5 class='card-title'>").text("Title: " + gifResults[i].title);
        var rating = $("<p class='card-text'>").text("Rating: " + gifResults[i].rating);
        var showImage = $("<img class='card-img-top'>");
        showImage.attr("src", gifResults[i].images.fixed_height_still.url);
        showImage.attr("data-still", gifResults[i].images.fixed_height_still.url);
        showImage.attr("data-animate", gifResults[i].images.fixed_height.url)
        showImage.attr("data-state", "still")
        gifDiv.prepend(showImage);
        gifDiv.append(title)
        gifDiv.append(rating);
        $(".gifs").prepend(gifDiv);
        }
    });    
});

//function for when user enters new show and hits submit
$(".submit").on("click", function(event){
	event.preventDefault();
	// sets inputted value to newShow
	newShow = $("#show-input").val();
	// new show is added to the show array 
	shows.push(newShow);
	buttonGenerator();
});

//changing the attribute of a gif from still to animate and vice versa
$(document).on("click", "img", function() {
  console.log("This works")
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});