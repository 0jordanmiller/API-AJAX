// pseudocode
/*Things that need to be done:
Create buttons that call on the GIPHY API
On click function for each gif that is appended to change 'still' to 'live'
    Appends the 'rating' for every gif
    empties the current div with gifs
Create search form
    search form creates a new button at the top
    remember 'stop event'
*/
// key: fLBh9znkHW9nzigSMaNWxa5ntlY3P26u

window.onload = function() {

var buttonNames = ['cat', 'dog', 'sheep', 'bird', 'cow', 'fish'];
var queryURL;

function createButtons() {
    $("#buttons").empty();
    for (i = 0; i < buttonNames.length; i++) {
        $("#buttons").append($("<button class='btn btn-primary button'>").text(buttonNames[i]));
    }
}

for (i = 0; i < buttonNames.length; i++) {
    $("#buttons").append($("<button class='btn btn-primary button'>").text(buttonNames[i]));
}

$("#add-more").on('click', function() {
    event.preventDefault();
    var imageAmount = 10;
    imageAmount = imageAmount + 10;
    queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + clickedButton + '&api_key=fLBh9znkHW9nzigSMaNWxa5ntlY3P26u&limit=' + imageAmount
    console.log(queryURL);   
        $.ajax({
            url: queryURL,
            method: "GET"
            })
            .then(function(response) {
                for (i = 0; i < response.data.length; i++) {
                    $("#gifs").append('<img class="aGif" id="gif-' + i + '" data-state="animate">')
                    $("#gif-" + i).attr('src', response.data[i].images.fixed_height.url)
                    $("#gif-" + i).attr('data-still', response.data[i].images.fixed_height_still.url)
                    $("#gif-" + i).attr('data-animate', response.data[i].images.fixed_height.url)
                    $('#gifs').append('Rating: ' + response.data[i].rating);
                }   
            });  
})

var clickedButton;
$('body').on('click', '.button', function() {
    $("#gifs").empty();
    var clickedButton = $(this).text()
    queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + clickedButton + '&api_key=fLBh9znkHW9nzigSMaNWxa5ntlY3P26u&limit=10'
    console.log(queryURL);   
        $.ajax({
            url: queryURL,
            method: "GET"
            })
            .then(function(response) {
                for (i = 0; i < response.data.length; i++) {
                    $("#gifs").append('<img class="aGif" id="gif-' + i + '" data-state="animate">')
                    $("#gif-" + i).attr('src', response.data[i].images.fixed_height.url)
                    $("#gif-" + i).attr('data-still', response.data[i].images.fixed_height_still.url)
                    $("#gif-" + i).attr('data-animate', response.data[i].images.fixed_height.url)
                    $('#gifs').append('Rating: ' + response.data[i].rating);
                }   
            });  
})

$('#add-button').on('click', function(event) {
    event.preventDefault();
    var userInput = $("#gif-input").val().trim();
    buttonNames.push(userInput)
    createButtons();

})

$('body').on('click', '.aGif', function() {
    var state = $(this).attr('data-state');
    
    if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'))
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).attr('data-still'))
        $(this).attr('data-state', 'still');
    }


})



}