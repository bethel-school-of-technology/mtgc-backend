'use strict';
module.exports = (sequelize, DataTypes) => {
  const missions_info = sequelize.define('missions_info', {
    MissionID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Username: DataTypes.STRING,
    Location: DataTypes.STRING,
    Email: {
      type: DataTypes.STRING,
      unique: true
    },
    Bio: DataTypes.STRING
  }, {});
  missions_info.associate = function(models) {
    // associations can be defined here
  };
  return missions_info;
};