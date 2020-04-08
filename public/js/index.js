
// Get references to page elements
var $movieText = $("#movie-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $movieList = $("#movie-list");
var $todoList = $("#example-list");
var addButton = $("<button>").text("Add to To Dos");


// // The API object contains methods for each kind of request we'll make
var todoList = {
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

var handleFormSubmit = function(event) {
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
    addButton.attr("id", response.Title);
    // originally created var for button here and then appended
    
    $movieList.prepend(newMovieTitle, newMoviePlot, newMoviePoster, addButton);
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
    console.log("new movie posted")
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
addButton.on("click", addtoToDo);


// // Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
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

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
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
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
