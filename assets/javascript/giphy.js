var availBtns = ['sloth', 'cuttlefish', 'koala', 'capybara', 'bonobo'];

function initialize(){
$("#button-collection").empty();
for (var i = 0; i < availBtns.length; i++){
    $("#button-collection").append("<button data-name = '" + availBtns[i] + "' class ='giphyBtn'>" + availBtns[i] + "</button>");
}
};

function changeState(){
   var gifSelected = $(this);

   var srcPaused = gifSelected.attr("gif-paused");
   console.log("Paused:" + srcPaused);

   var srcAnimated = gifSelected.attr("gif-animated");
   console.log("Animated:" + srcAnimated);

    var currentState = $(this).attr("state");

    if (currentState === "paused"){
        console.log(currentState);
        gifSelected.attr("src", srcAnimated);
        gifSelected.attr("state", "active");
    }
    else {
        gifSelected.attr("src", srcPaused);
        gifSelected.attr("state", "paused");
    }
}


function displayNewButton(){
    var search = $("#search-input").val();
    console.log(search);

    availBtns.push(search);
    // $("#button-collection").append("<button data-name = '" + search + "'>" + search + "</button>");
    $("#button-collection").empty();
    for (var i = 0; i < availBtns.length; i++){
        $("#button-collection").append("<button data-name = '" + availBtns[i] + "' class ='giphyBtn'>" + availBtns[i] + "</button>");
    }
}


// Event listener for our giphy-button
function displayGIPHY() {
    var searchFor = $(this).attr("data-name");
    console.log(searchFor);
    // Storing our giphy API URL for a random giphy image
    // var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=XkdB6WQ0U49mulZeYw3kM5iaKr1qtjsn&tag=" + searchFor + ""
    var queryURL = "https://api.giphy.com/v1/gifs/search?" + "q=" + searchFor + "&apikey=C5d75scOHxPnli61nvl3JPjObqAnq7Ub&limit=10"
    //"https://api.giphy.com/v1/gifs/search?api_key=XkdB6WQ0U49mulZeYw3kM5iaKr1qtjsn&q=" + searchFor + "&limit=2&offset=0&lang=en";
    console.log(queryURL);

    //DO THIS 8 times
    // for (var i = 0; i < 8; i++){
        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
    // After the data from the AJAX request comes back
        .then(function(response) {
            $("#gifs").empty();
            for (var i=0; i< response.data.length; i++){
                var giphyUrlStill = response.data[i].images.fixed_height_still.url;
                var giphyUrl = response.data[i].images.fixed_height.url;
                var rating = response.data[i].rating;

                console.log(giphyUrlStill);
                // Creating and storing an image tag
                var newDiv = $("<div>");
                var ratingText = $("<h5>")
                var giphyImage = $("<img>");
                
                newDiv.attr("class","returnedGif");

                ratingText.html("Rating: " + rating);

                giphyImage.attr("src", giphyUrlStill);
                // giphyImage.attr("class", "returnedGif");
                giphyImage.attr("alt", "giphy image");
                giphyImage.attr("gif-animated", giphyUrl);
                giphyImage.attr("gif-paused", giphyUrlStill);
                giphyImage.attr("state", "paused");
                giphyImage.css("width", "200");

                // Prepending the giphyImage to the gifs div
                newDiv.prepend(ratingText);
                newDiv.prepend(giphyImage);
                $("#gifs").prepend(newDiv);
            };
        });
   
};

initialize();

$("#add-search").on("click", function(event) {
    event.preventDefault();
    displayNewButton();
    $("#search-input").val("");
});

$(document).ready(function(){
    $("img").click(function() {
        console.log("working");
        console.log(this);
    });
});

$(document).on("click", ".giphyBtn", displayGIPHY);
$(document).on("click", "img", changeState);

