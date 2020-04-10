
// Get references to page elements
var $movieText = $("#movie-text");
var $bookText = $("#book-text");
var $submitMovieBtn = $("#submitMovie");
var $submitBookBtn = $("#submitBook");
var $movieList = $("#movie-list");
var $todoList = $("#example-list");
var addButton;


// // The API object contains methods for each kind of request we'll make
var todoList = {
  getTodo: function() {
    return $.ajax({
      url: "api/todo",
      type: "GET"
    });
  },
  deleteTodo: function (id) {
    return $.ajax({
      url: "api/todo/" + id,
      type: "DELETE"
    });
  },
  postSong: function(){
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/spotify",
      data: JSON.stringify(song)


      // getExamples: function () {
      //   saveExample: function(example) {
      //     return $.ajax({
      //       headers: {
      //         "Content-Type": "application/json"
      //       },
      //       type: "POST",
      //       url: "api/examples",
      //       data: JSON.stringify(example)
      //     });
      //   },
    })
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshTodo = function () {
  todoList.getTodo().then(function (data) {
    var $todo = data.map(function (todo) {
      var $a = $("<a>")
        .text(todo.text)
        .attr("href", "/todo/" + todo.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": todo.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $todoList.empty();
    $todoList.append($todo);
  });
};

refreshTodo();

var handleMovieFormSubmit = function(event) {
  event.preventDefault();
  var movieQuery
  movieQuery = $movieText.val().trim().split(" ").join("+");
  console.log("The movie query is: " + movieQuery);
  
  $.ajax({
    url: "https://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&apikey=trilogy",
    method: "GET"
  }).then(function(response) {
    var newMovieTitle = $("<p>").text("Movie Title: " + response.Title).attr("id", "newMovie-heading");
    var newMoviePlot = $("<p>").text("Plot: " + response.Plot);
    var newMoviePoster = $("<img>").attr("src",  response.Poster);
    var addMovieButton =  $('<button>').text("Add to To Dos").attr("id", response.Title).addClass("btn btn-primary");
    
    $movieList.append('<li>');
    $movieList.append(newMovieTitle, newMoviePlot, newMoviePoster, addMovieButton);
    $movieList.append('</li>');

    addMovieButton.on("click", addtoToDo);
  });  
  
  //   // var example = {
    //   //   text: $exampleText.val().trim(),
    //   //   description: $exampleDescription.val().trim()
    //   // };
    
    //   // API.saveExample(example).then(function() {
      //   //   refreshExamples();
      //   // });
      
  $movieText.val("");    
};
  
var handleBookFormSubmit = function(event) {
  event.preventDefault();
  var bookQuery
  bookQuery = $bookText.val().trim().split(" ").join("+");
  console.log("The book query is: " + bookQuery);
  
  $.ajax({
    url: "https://www.googleapis.com/books/v1/volumes/?q=" + bookQuery + "&key=AIzaSyD6fZh0lQSvHpa3XivKX12LMo6_rSTjWK4",
    method: "GET"
  }).then(function(books) {
    $.each(books['items'], function (index, book) {
      var BookCoverUrl = ( book['volumeInfo']['imageLinks'] !== undefined ) ? book['volumeInfo']['imageLinks']['thumbnail'] : 'https://d827xgdhgqbnd.cloudfront.net/wp-content/uploads/2016/04/09121712/book-cover-placeholder.png';
      var BookHTML = 'Book Title: ' + book['volumeInfo']['title'] + '<br>' +
      'Author(s): ' + book['volumeInfo']['authors'].join(', ') + '<br>' +
      '<img src="' + BookCoverUrl + '">';
      var addBookButton = $('<button id="' + book['volumeInfo']['title'] + '" class="btn btn-primary">Add to To Dos</button>');

      $bookList.append('<li>');
      $bookList.append(BookHTML, addBookButton);
      $bookList.append('</li>');

      addBookButton.on("click", addtoToDo);
    });
  });
  
  //   // var example = {
    //   //   text: $exampleText.val().trim(),
    //   //   description: $exampleDescription.val().trim()
    //   // };
    
    //   // API.saveExample(example).then(function() {
      //   //   refreshExamples();
      //   // });
      
  $bookText.val("");    
};
    
var addtoToDo = function(event) {
  // originally in the .then part of create movie 
  console.log("add button clicked")
  event.preventDefault();
  var newAdd = {
    text: this.id
  };
  $.ajax("/api/examples", {
    type: "POST",
    data: newAdd
  }).then(function () {
    refreshExamples();
  });
};

    // handleDeleteBtnClick is called when an example's delete button is clicked
    // Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
    // need to add functionality so it adds it to the timeline here as well
    var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// // Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$todoList.on("click", ".delete", handleDeleteBtnClick);


//----------------------//SpotifyAPI STUFF//------------------//
$("#spotify-submit").on(click, function () {
  console.log("spotify submit button clicked")
  spotify();
});


todoList.postSong().then(function(data){
  var $songs = data.map(function(song){
    var $a = $("<a>")
    .text(song.text)
    .attr("href", "/example/" + song.id);

  var $li = $("<li>")
    .attr({
      class: "list-group-item",
      "data-id": song.id
    })
    .append($a);

  var $button = $("<button>")
    .addClass("btn btn-danger float-right delete")
    .text("ｘ");

  $li.append($button);

  return $li;
  })
})


var spotifyList = $("#spotify-list");
var addButton;
var input = $("#spotify-text").val().trim();

var songName = $("<p>").text("Song: " + response.tracks.items[i].name).attr("id", "song-heading");
var artist = $("<p>").text("Artist: ", response.tracks.items[i].artists[0].name);
var albumCover = $("<img>").attr("src", response.tracks.items[i].album.images[1].url);
addButton = $("<button>").text("Add to To Dos").attr("id", response.tracks.items[i].name);

spotifyList.push(songName, artist, albumCover, addButton);
addButton.on("click", addtoToDo);





//EXAMPLE CODE GIVEN TO US
// // Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitMovieBtn = $("#submit");
// var $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleMovieFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleMovieFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitMovieBtn.on("click", handleMovieFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
