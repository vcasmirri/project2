var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Todo.findAll({}).then(function(dbtodos) {
      res.json(dbtodos);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Todo.create(req.body).then(function(dbtodos) {
      res.json(dbtodos);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Todo.destroy({ where: { id: req.params.id } }).then(function(dbtodos) {
      res.json(dbtodos);
    });
  });
};
