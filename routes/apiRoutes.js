var db = require("../models");
var spotify = require("../spotifyAPI/spotifyAPI");

module.exports = function(app) {
  // Get all examples
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
