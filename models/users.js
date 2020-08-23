'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users', 
    {
      UserId: { //foreign key in mission_table 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: {
      type: DataTypes.STRING,
      unique: true
    },
    Username: {
      type: DataTypes.STRING,
      unique: true
    },
    Password: DataTypes.STRING,
    Admin: {
      type: DataTypes.BOOLEAN,
      default: 0
    },
    Missionary:{
      type: DataTypes.BOOLEAN,
      default: 0
    },
    PhoneNumber: DataTypes.STRING,
    Bio: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};