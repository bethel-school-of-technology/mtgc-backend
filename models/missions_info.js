'use strict';
module.exports = (sequelize, DataTypes) => {
  const missions_info = sequelize.define('missions_info', {
    MissionId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    OrganizationName: DataTypes.STRING,
    OrganizationStreetAddress: DataTypes.STRING,
    City: DataTypes.STRING,
    State: DataTypes.STRING,
    Zip: DataTypes.INTEGER,
    MissionLocationCity: DataTypes.STRING,
    MissionLocationCountry: DataTypes.STRING,
    Verified: DataTypes.BOOLEAN,
    Username: DataTypes.STRING,
    Image: DataTypes.BLOB
  }, {});
  missions_info.associate = function(models) {
    // associations can be defined here
  };
  return missions_info;
};