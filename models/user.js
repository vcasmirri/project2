module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      name: DataTypes.STRING,
    });
    User.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      User.hasMany(models.Todo, {
        onDelete: "cascade"
      });
    };

    return User;
  };
