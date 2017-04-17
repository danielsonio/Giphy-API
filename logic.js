$("#submit").on("click", function() {
  var request = $("#giphy").val().trim();
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    request + "&api_key=dc6zaTOxFJmzC&limit=10";
  console.log(queryURL);

  var createButton = $('<button></button>').attr("value", request);
  console.log(createButton);

  $("#buttons-go-here").append(createButton);


  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var results = response.data;
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var giphyImage = $("<img>");
        giphyImage.attr("src", results[i].images.fixed_height.url);

        gifDiv.prepend(p);
        gifDiv.prepend(giphyImage);

        $("#gifs-appear-here").prepend(gifDiv);
      }
    });
});
