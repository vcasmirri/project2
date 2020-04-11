module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define("Todo", {
    text: DataTypes.STRING,
    checked: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER,
    dateChecked: DataTypes.DATEONLY
    // FOREIGN KEY (user_id) REFERENCES users(id)
  });
  return Todo;
};
