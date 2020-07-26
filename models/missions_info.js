'use strict';
module.exports = (sequelize, DataTypes) => {
  const missions_info = sequelize.define('missions_info', {
    OrgId: {
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
    Image: DataTypes.BLOB,
    UserId: {
      allowNull:false,
      type: DataTypes.INTEGER
    },
  }, {});
  missions_info.associate = function(models) {
    // associations can be defined here
  };
  return missions_info;
};