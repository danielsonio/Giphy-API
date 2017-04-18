var giphies = ["unicorns", "fairies", "rainbows", "kittens", "falkor"];



function getGiphy() {
  $("#gifs-appear-here").empty();
  var giphy = $(this).attr("data-name");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    giphy + "&api_key=dc6zaTOxFJmzC&limit=10";
  console.log(queryURL);

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var giphyDiv = $("<div>");

    for(var i = 0; i < response.data.length; i++){
          var rating = response.data[i].rating;

          var p = $("<p>").text("Rating: " + rating);
          giphyDiv.append(p);
          var giphyImage = $("<img>");
          giphyImage.attr("src", response.data[i].images.fixed_height_still.url);
          giphyImage.attr("data-still", response.data[i].images.fixed_height_still.url);
          giphyImage.attr("data-animate", response.data[i].images.fixed_height.url);
          giphyImage.attr("data-state", "still");
          giphyImage.attr("class", "giffers col-sm-2");
          giphyDiv.append(giphyImage);

          $("#gifs-appear-here").prepend(giphyDiv);
    }

    });
}
// <img src="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-still="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-animate="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="gif">




function renderButtons() {

  $("#buttons-go-here").empty();

  for (var i = 0; i < giphies.length; i++){
    var button = $("<button>");
    button.addClass("gifs");
    button.attr("data-name", giphies[i]);
    button.text(giphies[i]);
    $("#buttons-go-here").append(button);
  }
}

$("#submit").on("click", function(event) {
  event.preventDefault();

  var newGif = $("#giphy").val().trim();

  giphies.push(newGif);
  renderButtons();
});

$(document).on("click", ".gifs", getGiphy);

renderButtons();


$(document).on("click", ".giffers", function() {
  console.log("yaaaaaaaa");
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked images state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
