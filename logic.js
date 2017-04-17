var giphies = ["unicorns", "fairies", "rainbows", "kittens", "falkor"];



function getGiphy() {

  var giphy = $(this).attr("data-name");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    giphy + "&api_key=dc6zaTOxFJmzC&limit=10";
  console.log(queryURL);

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var giphyDiv = $("<div class='gifs'>");
      var results = response.data;
      console.log(results);

      var rating = response.data[0].rating;

      var p = $("<p>").text("Rating: " + rating);

      giphyDiv.append(p);
      var giphyImage = $("<img>");
      giphyImage.attr("src", response.data[0].images.fixed_height.url);
      giphyDiv.append(giphyImage);

      $("#gifs-appear-here").append(giphyDiv);


    });
}


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


// var results = response.data;
// console.log(results);
// for (var i = 0; i < results.length; i++) {
//   var gifDiv = $("<div class='item'>");
//
//   var rating = results[i].rating;
//
//   var p = $("<p>").text("Rating: " + rating);
//
//   var giphyImage = $("<img>");
//   giphyImage.attr("src", results[i].images.fixed_height.url);
//
//   gifDiv.prepend(p);
//   gifDiv.prepend(giphyImage);
//
//   $("#gifs-appear-here").prepend(gifDiv);
