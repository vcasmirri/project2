module.exports = function(sequelize, DataTypes) {
    var Completed = sequelize.define("Completed", {
        text: DataTypes.STRING,
        date: DataTypes.DATEONLY,
        userid: DataTypes.INTEGER
    });
 

    return Completed;
};
