module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define("Todo", {
    text: DataTypes.STRING,
    checked: DataTypes.BOOLEAN,

    dateChecked: DataTypes.DATEONLY,
    // FOREIGN KEY (user_id) REFERENCES users(id)
  });
  Todo.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Todo.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Todo;
};
