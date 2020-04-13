var db = require("../models");
var spotify = require("../spotifyAPI/spotifyAPI");

module.exports = function(app) {
  // Get all examples

  // user routes

  app.get("/api/users", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    console.log("It can see my route stuff.");
    db.User.findAll({
      include: [db.Todo]
    }).then(function(User) {
      res.json(User);
      // console.log("it is returning this user: " + JSON.stringify(User[0].name));
    });
  });

  app.get("/api/user/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Todo]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/examples", function(req, res) {
    db.Todo.findAll({}).then(function(dbtodos) {
      res.json(dbtodos);
    });
  });

  app.get("/completed", function(req, res) {
    db.Completed.findAll({}).then(function(dbCompleteds) {
      res.json(dbCompleteds);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Todo.create(req.body).then(function(dbtodos) {
      res.json(dbtodos);
    });
  });

  app.post("/api/completed", function(req, res) {
    db.Completed.create(req.body).then(function(dbCompleted) {
      res.json(dbCompleted);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Todo.destroy({ where: { id: req.params.id } }).then(function(dbtodos) {
      res.json(dbtodos);
    });
  });

  app.post("/api/spotify", function(req, res) {
    spotify(req.body, res);
  });
};
